import {createAction, createReducer, Action} from 'typesafe-actions';
import {ThunkAction} from '@app/redux/store';
import {IPost} from '@app/models/post.model';
import {createNewPost, getUserPosts} from '@app/services/database/post.database';

export const APPEND_USER_POSTS = '@post/APPEND_USER_POST';
export const APPEND_FOLLOW_POSTS = '@post/APPEND_FOLLOW_POST';
///////////////////////////////////////
// STORE
///////////////////////////////////////

export interface IStore {
  userPosts: IPost[];
  followPosts: IPost[];
}

const initialState: IStore = {
  userPosts: [],
  followPosts: [],
};

///////////////////////////////////////
// Actions
///////////////////////////////////////
const appendUserPosts = createAction(APPEND_USER_POSTS, (v: IPost[]) => v)();
const appendFollowPosts = createAction(APPEND_FOLLOW_POSTS, (v: IPost[]) => v)();

export const Actions = {
  fetchMoreUserPosts: (): ThunkAction => async dispatch => {
    dispatch(appendUserPosts(await getUserPosts()));
  },
  createNewPost: (data: Partial<IPost>): ThunkAction => async dispatch => {
    const post = await createNewPost(data);
    dispatch(appendUserPosts([post]));
  },
};

///////////////////////////////////////
// Reducers
///////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(appendUserPosts, (state, {payload}) => ({
    ...state,
    userPosts: [...state.userPosts, ...payload],
  }))
  .handleAction(appendFollowPosts, (state, {payload}) => ({
    ...state,
    followPosts: [...state.followPosts, ...payload],
  }));
