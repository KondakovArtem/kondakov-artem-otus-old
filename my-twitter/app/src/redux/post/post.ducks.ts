import {createAction, createReducer, Action} from 'typesafe-actions';
import {isEmpty, uniqBy} from 'lodash-es';

import {ThunkAction} from '@app/redux/store';
import {IPost, IPostMutation} from '@app/models/post.model';
import {createNewPost, onDbUserPostChanged, toggleLikeDbPost} from '@app/services/database/post.database';
import {takePhoto} from '@app/services/photo/photo.service';
import {uploadImage} from '@app/services/database/database.service';
import {navUtils} from '@app/services/navigation/navigation.service';
import {SIGN_OUT_CLEAR} from '@app/redux/auth/auth.actions';

export const APPEND_USER_POSTS = '@post/APPEND_USER_POST';
export const APPEND_FOLLOW_POSTS = '@post/APPEND_FOLLOW_POST';
export const SET_NEW_POST_PHOTO = '@post/SET_NEW_POST_PHOTO';
export const SET_IS_FETCHING = '@post/SET_IS_FETCHING';
export const CLEAR_NEW_POST = '@post/CLEAR_NEW_POST';
export const SET_POST_TEXT = '@post/SET_POST_TEXT';
export const MUTATE_USER_POST = '@post/MUTATE_USER_POST';
///////////////////////////////////////
// STORE
///////////////////////////////////////

export interface IStore {
  userPosts: IPost[];
  userPostCount: number;
  followPosts: IPost[];
  newPost: {
    text: string;
    imagePath: string;
    isFetching: boolean;
  };
}

const initialState: IStore = {
  userPosts: [],
  userPostCount: 10,
  followPosts: [],
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
const setNewPostPhoto = createAction(SET_NEW_POST_PHOTO, (s: string) => s)();
const setIsFetching = createAction(SET_IS_FETCHING, (v: boolean) => v)();
const clearNewPost = createAction(CLEAR_NEW_POST, () => {})();
const setPostText = createAction(SET_POST_TEXT, (v: string) => v)();
const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();
const mutateUserPosts = createAction(MUTATE_USER_POST, (v: IPostMutation[]) => v)();

export const Actions = {
  init: (): ThunkAction => async dispatch => {
    onDbUserPostChanged(10, (mutationList: IPostMutation[]) => {
      // const {post} = getStore();
      dispatch(mutateUserPosts(mutationList));
    });
  },
  fetchMoreUserPosts: (): ThunkAction => async () => {
    // dispatch(appendUserPosts(await getUserPosts()));
  },
  createNewPost: (data: Partial<IPost>): ThunkAction => async () => {
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
  takePhoto: (): ThunkAction => async dispatch => {
    const photoRef = await takePhoto();
    if (photoRef) {
      dispatch(setNewPostPhoto(photoRef.uri));
    }
  },
  removePhoto: (): ThunkAction => async dispatch => {
    dispatch(setNewPostPhoto(''));
  },
  togglePostLike: ({id}: IPost): ThunkAction => async () => {
    await toggleLikeDbPost(id);
  },
};

const sortPost = (a: IPost, b: IPost) => {
  return a.createdAt.getTime() < b.createdAt.getTime() ? 1 : -1;
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
    const userPosts = [...state.userPosts];
    payload.forEach(({type, doc}) => {
      if (type === 'added') {
        const curIdx = userPosts.findIndex(({id}) => id === doc.id);
        curIdx > -1 ? userPosts.splice(curIdx, 1, doc) : userPosts.push(doc);
      } else if (type === 'modified') {
        const curIdx = userPosts.findIndex(({id}) => id === doc.id);
        curIdx > -1 && userPosts.splice(curIdx, 1, doc);
      } else if (type === 'removed') {
        const curIdx = userPosts.findIndex(({id}) => id === doc.id);
        curIdx > -1 && userPosts.splice(curIdx, 1);
      }
    });

    return {
      ...state,
      userPosts: uniqBy([...userPosts], ({id}) => id).sort(sortPost),
    };
  });
