import {createAction, createReducer, Action} from 'typesafe-actions';
import {uniqBy} from 'lodash-es';

import {IPost, IPostMutation} from 'models/post.model';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';

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
export const REFRESH_USER_POSTS = '@post/REFRESH_USER_POSTS';
export const DELETE = '@post/DELETE';

///////////////////////////////////////
// STORE
///////////////////////////////////////

export interface IStore {
  userPosts: IPost[];
  userPostCount: number;
  userPostRefreshing: boolean;
  postToDelete: string[];
  followPosts: IPost[];
  followPostCount: number;
  followPostRefreshing: boolean;
  newPost: {
    text: string;
    imagePath: string;
    isFetching: boolean;
  };
}

const initialState: IStore = {
  userPosts: [],
  postToDelete: [],
  userPostCount: 50,
  userPostRefreshing: false,
  followPosts: [],
  followPostCount: 50,
  followPostRefreshing: false,
  newPost: {
    text: '',
    imagePath: '',
    isFetching: false,
  },
};

///////////////////////////////////////
// Actions
///////////////////////////////////////
export const appendUserPosts = createAction(APPEND_USER_POSTS, (v: IPost[]) => v)();
export const appendFollowPosts = createAction(APPEND_FOLLOW_POSTS, (v: IPost[]) => v)();
export const setFollowPosts = createAction(SET_FOLLOW_POSTS, (v: IPost[]) => v)();
export const setNewPostPhoto = createAction(SET_NEW_POST_PHOTO, (s: string) => s)();
export const setIsFetching = createAction(SET_IS_FETCHING, (v: boolean) => v)();
export const clearNewPost = createAction(CLEAR_NEW_POST, () => {})();
export const setPostText = createAction(SET_POST_TEXT, (v: string) => v)();
export const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();
export const mutateUserPosts = createAction(MUTATE_USER_POSTS, (v: IPostMutation[]) => v)();
export const mutateFollowPosts = createAction(MUTATE_FOLLOW_POSTS, (v: IPostMutation[]) => v)();
export const appendToDeletingPost = createAction(APPEND_TO_DELETING_POST, (v: string) => v)();
export const removeFromDeletingPost = createAction(REMOVE_FROM_DELETING_POST, (v: string) => v)();
export const deletePost = createAction(DELETE, (v: IPost) => v)();
export const setRefreshingUserPost = createAction(REFRESH_USER_POSTS, (v: boolean) => v)();

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
    followPostCount: Math.max(initialState.followPostCount, payload.length),
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
  }))
  .handleAction(setRefreshingUserPost, (state, {payload}) => ({
    ...state,
    userPostRefreshing: payload,
  }));
