import {createAction, createReducer, Action} from 'typesafe-actions';
import {isEmpty, uniqBy} from 'lodash-es';

import {ThunkAction} from 'store';
import {IPost, IPostMutation} from 'models/post.model';
import {
  createNewPost,
  onDbUserPostChanged,
  toggleLikeDbPost,
  onDbFollowsPostChanged,
  deleteDBPost,
} from 'services/database/post.database';
import {takePhoto} from 'services/photo/photo.service';
import {uploadImage} from 'services/database/database.service';
import {navUtils} from 'services/navigation/navigation.service';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.actions';
import {unregisterDbSubscriber} from 'services/database/subscription.service';
import {Actions as dialogActions} from 'store/dialog/dialog.ducks';
import {DialogAction, IDialogButtonAction} from 'models/dialog.model';
import {DELETE_POST_DURATION} from 'constants/theme';

export const APPEND_USER_POSTS = '@post/APPEND_USER_POSTS';
export const APPEND_FOLLOW_POSTS = '@post/APPEND_FOLLOW_POSTS';
export const SET_FOLLOW_POSTS = '@post/SET_FOLLOW_POSTS';
export const SET_NEW_POST_PHOTO = '@post/SET_NEW_POST_PHOTO';
export const SET_IS_FETCHING = '@post/SET_IS_FETCHING';
export const CLEAR_NEW_POST = '@post/CLEAR_NEW_POST';
export const SET_POST_TEXT = '@post/SET_POST_TEXT';
export const MUTATE_USER_POSTS = '@post/MUTATE_USER_POSTS';
export const MUTATE_FOLLOW_POSTS = '@post/MUTATE_FOLLOW_POSTS';
export const APPEND_TO_DELETING_POST = '@post/APPEND_TO_DELETING_POST';
export const REMOVE_FROM_DELETING_POST = '@post/REMOVE_FROM_DELETING_POST';
export const DELETE = '@post/DELETE';

///////////////////////////////////////
// STORE
///////////////////////////////////////

export interface IStore {
  userPosts: IPost[];
  userPostCount: number;
  postToDelete: string[];
  followPosts: IPost[];
  followPostCount: number;
  newPost: {
    text: string;
    imagePath: string;
    isFetching: boolean;
  };
}

const initialState: IStore = {
  userPosts: [],
  postToDelete: [],
  userPostCount: 10,
  followPosts: [],
  followPostCount: 10,
  newPost: {
    text: '',
    imagePath: '',
    isFetching: false,
  },
};

///////////////////////////////////////
// Actions
///////////////////////////////////////
const appendUserPosts = createAction(APPEND_USER_POSTS, (v: IPost[]) => v)();
const appendFollowPosts = createAction(APPEND_FOLLOW_POSTS, (v: IPost[]) => v)();
const setFollowPosts = createAction(SET_FOLLOW_POSTS, (v: IPost[]) => v)();
const setNewPostPhoto = createAction(SET_NEW_POST_PHOTO, (s: string) => s)();
const setIsFetching = createAction(SET_IS_FETCHING, (v: boolean) => v)();
const clearNewPost = createAction(CLEAR_NEW_POST, () => {})();
const setPostText = createAction(SET_POST_TEXT, (v: string) => v)();
const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();
const mutateUserPosts = createAction(MUTATE_USER_POSTS, (v: IPostMutation[]) => v)();
const mutateFollowPosts = createAction(MUTATE_FOLLOW_POSTS, (v: IPostMutation[]) => v)();
const appendToDeletingPost = createAction(APPEND_TO_DELETING_POST, (v: string) => v)();
const removeFromDeletingPost = createAction(REMOVE_FROM_DELETING_POST, (v: string) => v)();
const deletePost = createAction(DELETE, (v: IPost) => v)();
/////////////////////////////////////////
// Thunks
/////////////////////////////////////////
export const Actions = {
  init: (): ThunkAction => async dispatch => {
    onDbUserPostChanged(10, (mutationList: IPostMutation[]) => {
      // const {post} = getStore();
      dispatch(mutateUserPosts(mutationList));
    });
  },
  updateFollowPost: (): ThunkAction => async (dispatch, getStore) => {
    const {users, post, authData} = getStore();
    const {userUid} = authData;
    const {follows} = users;
    const {followPostCount} = post;
    unregisterDbSubscriber('followPosts');
    if (follows.length) {
      onDbFollowsPostChanged(followPostCount, [...follows, userUid], (mutationList: IPostMutation[]) => {
        dispatch(mutateFollowPosts(mutationList));
      });
    } else {
      dispatch(setFollowPosts([]));
    }
  },
  fetchMoreUserPosts: () => async () => {
    // dispatch(appendUserPosts(await getUserPosts()));
  },
  createNewPost: (data: Partial<IPost>) => async () => {
    //const post =
    await createNewPost(data);
    // dispatch(appendUserPosts([post]));
  },
  changePostText: (value: string): ThunkAction => async dispatch => {
    dispatch(setPostText(value));
  },
  postMessage: (): ThunkAction => async (dispatch, getStore) => {
    const {post} = getStore();
    const {newPost} = post;
    const {imagePath, text} = newPost;
    let image;
    try {
      if (!isEmpty(imagePath)) {
        image = await uploadImage(imagePath, 'stock');
      }
      await createNewPost({image, text});
    } catch (e) {}
    dispatch(clearNewPost());
    navUtils.back();
  },
  deletePostAction: (buttonAction: IDialogButtonAction): ThunkAction => async dispatch => {
    const {dialog, key} = buttonAction;
    const {data: post} = dialog;
    const {id} = post;
    if (key === 'delete') {
      dispatch(appendToDeletingPost(id));
      setTimeout(async () => {
        dispatch(deletePost(post));
        await deleteDBPost(post);
        dispatch(removeFromDeletingPost(id));
      }, DELETE_POST_DURATION);
    }
  },
  deletePostConfirm: (post: IPost): ThunkAction => async (dispatch, getStore) => {
    const {authData} = getStore();
    const {userUid} = authData;
    if (userUid === post.author) {
      dialogActions.addDialog({
        title: 'Do you really want to delete this post?',
        buttons: [
          {title: 'Cancel', type: 'outline', key: 'cancel'},
          {title: 'Delete', key: 'delete'},
        ],
        action: DialogAction.DELETE_POST,
        data: post,
      })(dispatch, getStore);
    }
  },
  takePhoto: (): ThunkAction => async dispatch => {
    const photoRef = await takePhoto();
    if (photoRef) {
      dispatch(setNewPostPhoto(photoRef.uri));
    }
  },
  removePhoto: (): ThunkAction => async dispatch => {
    dispatch(setNewPostPhoto(''));
  },
  togglePostLike: ({id}: IPost) => async () => {
    await toggleLikeDbPost(id);
  },
};

const sortPost = (a: IPost, b: IPost) => {
  return a.createdAt.getTime() < b.createdAt.getTime() ? 1 : -1;
};

const mutatePosts = (originPosts: IPost[], mutationList: IPostMutation[]) => {
  mutationList.forEach(({type, doc}) => {
    if (type === 'added') {
      const curIdx = originPosts.findIndex(({id}) => id === doc.id);
      curIdx > -1 ? originPosts.splice(curIdx, 1, doc) : originPosts.push(doc);
    } else if (type === 'modified') {
      const curIdx = originPosts.findIndex(({id}) => id === doc.id);
      curIdx > -1 && originPosts.splice(curIdx, 1, doc);
    } else if (type === 'removed') {
      const curIdx = originPosts.findIndex(({id}) => id === doc.id);
      curIdx > -1 && originPosts.splice(curIdx, 1);
    }
  });
  return uniqBy([...originPosts], ({id}) => id).sort(sortPost);
};

///////////////////////////////////////
// Reducers
///////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(signOutClear, () => ({
    ...initialState,
  }))
  .handleAction(appendUserPosts, (state, {payload}) => ({
    ...state,
    userPosts: uniqBy([...state.userPosts, ...payload], ({id}) => id).sort(sortPost),
  }))
  .handleAction(appendFollowPosts, (state, {payload}) => ({
    ...state,
    followPosts: uniqBy([...state.followPosts, ...payload], ({id}) => id),
  }))
  .handleAction(setNewPostPhoto, (state, {payload}) => ({
    ...state,
    newPost: {
      ...state.newPost,
      imagePath: payload,
    },
  }))
  .handleAction(setIsFetching, (state, {payload}) => ({
    ...state,
    newPost: {
      ...state.newPost,
      isFetching: payload,
    },
  }))
  .handleAction(clearNewPost, state => ({
    ...state,
    newPost: {...initialState.newPost},
  }))
  .handleAction(setPostText, (state, {payload}) => ({
    ...state,
    newPost: {
      ...state.newPost,
      text: payload,
    },
  }))
  .handleAction(mutateUserPosts, (state, {payload}) => {
    return {
      ...state,
      userPosts: mutatePosts([...state.userPosts], payload),
    };
  })
  .handleAction(mutateFollowPosts, (state, {payload}) => {
    return {
      ...state,
      followPosts: mutatePosts([...state.followPosts], payload),
    };
  })
  .handleAction(setFollowPosts, (state, {payload}) => ({
    ...state,
    followPosts: payload,
    followPostCount: Math.min(initialState.followPostCount),
  }))
  .handleAction(appendToDeletingPost, (state, {payload}) => ({
    ...state,
    postToDelete: [...state.postToDelete, payload],
  }))
  .handleAction(removeFromDeletingPost, (state, {payload}) => ({
    ...state,
    postToDelete: state.postToDelete.filter(item => item !== payload),
  }))
  .handleAction(deletePost, (state, {payload}) => ({
    ...state,
    userPosts: state.userPosts.filter(({id}) => payload.id !== id),
    followPosts: state.followPosts.filter(({id}) => payload.id !== id),
  }));
