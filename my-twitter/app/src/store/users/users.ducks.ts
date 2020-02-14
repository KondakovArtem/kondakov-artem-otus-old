import {createAction, createReducer, Action} from 'typesafe-actions';
import Fuse, {FuseOptions} from 'fuse.js';
import {map, isEmpty, uniqBy} from 'lodash-es';

import {ThunkAction} from 'store';
import {IUserInfo, IUserInfoMutation, IDBFollows, IDBFollowersMutation} from 'models/user.model';
import {navUtils} from 'services/navigation/navigation.service';
import {onDbUsersChanged} from 'services/database/userinfo.database';
import {FOLLOW_SCREEN} from 'models/navigation.model';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.actions';
import {toggleFollowDb, onDbFollowsChanged, onDbFollowersChanged} from 'services/database/follows.database';
import {Actions as postActions} from 'store/post/post.ducks';

export const SET_SEARCH = '@users/SET_SEARCH';
export const SET_SEARCH_FOLLOWS = '@users/SET_SEARCH_FOLLOWS';
export const MUTATE_USERS = '@users/MUTATE_USERS';
export const MUTATE_FOLLOWERS = '@users/MUTATE_FOLLOWERS';
export const SET_FOLLOWS = '@users/SET_FOLLOWS';

///////////////////////////////////////
// STORE
///////////////////////////////////////
export interface IStore {
  search: string;
  userInfoMap: {
    [key: string]: IUserInfo;
  };
  searchFollows: IUserInfo[];
  follows: string[];
  followers: string[];
}

const initialState: IStore = {
  search: '',
  searchFollows: [],
  userInfoMap: {},
  follows: [],
  followers: [],
};

///////////////////////////////////////
// Actions
///////////////////////////////////////
const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();
const setSearch = createAction(SET_SEARCH, (v: string) => v)();
const setSearchFollows = createAction(SET_SEARCH_FOLLOWS, (v: IUserInfo[]) => v)();
const mutateUsers = createAction(MUTATE_USERS, (v: IUserInfoMutation[]) => v)();
const setFollows = createAction(SET_FOLLOWS, (v: string[]) => v)();
const mutateFollowers = createAction(MUTATE_FOLLOWERS, (v: IDBFollowersMutation[]) => v)();

////////////////////////////////////////
// Thunks
////////////////////////////////////////
export const Actions = {
  init: (): ThunkAction => async (dispatch, getStore) => {
    onDbUsersChanged((userInfoMutations: IUserInfoMutation[]) => {
      dispatch(mutateUsers(userInfoMutations));
      if (navUtils.getCurrentScreen() === FOLLOW_SCREEN) {
        Actions.filterSearchFollows()(dispatch, getStore);
      }
    });
    onDbFollowsChanged((data: IDBFollows = {} as IDBFollows) => {
      const {ids = []} = data;
      Actions.updateFollows(ids)(dispatch, getStore);
    });
    onDbFollowersChanged((data: IDBFollowersMutation[]) => {
      dispatch(mutateFollowers(data));
    });
  },
  updateFollows: (ids: string[]): ThunkAction => (dispatch, getStore) => {
    dispatch(setFollows(ids));
    postActions.updateFollowPost()(dispatch, getStore);
  },
  filterSearchFollows: (): ThunkAction => async (dispatch, getStore) => {
    const {users: usersStore, authData} = getStore();
    const {userInfoMap = {}, search} = usersStore;
    const {userUid} = authData;

    const infoList = map(userInfoMap, item => item).filter(({id}) => id !== userUid);

    if (isEmpty(search)) {
      dispatch(setSearchFollows(infoList));
      return;
    }
    const fuse = new Fuse(infoList, {
      keys: ['name', 'email', 'about'],
    } as FuseOptions<IUserInfo>);
    dispatch(setSearchFollows(fuse.search(search) as IUserInfo[]));
  },
  setSearch: (value: string): ThunkAction => async (dispatch, getStore) => {
    dispatch(setSearch(value));
    Actions.filterSearchFollows()(dispatch, getStore);
  },
  backPress: () => async () => {
    navUtils.back();
  },
  toggleFollow: (userUid: string) => async () => {
    await toggleFollowDb(userUid);
  },
};

///////////////////////////////////////
// Reducers
///////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(signOutClear, () => ({
    ...initialState,
  }))
  .handleAction(setSearch, (state, {payload}) => ({
    ...state,
    search: payload,
  }))
  .handleAction(mutateUsers, (state, {payload}) => {
    const userInfoMap = {...state.userInfoMap};
    payload.forEach(({type, doc}) => {
      if (['added', 'modified'].includes(type)) {
        userInfoMap[doc.id] = doc;
      } else if (type === 'removed') {
        delete userInfoMap[doc.id];
      }
    });
    return {
      ...state,
      userInfoMap,
    };
  })
  .handleAction(mutateFollowers, (state, {payload}) => {
    const {followers = []} = state;
    payload.map(({type, doc}) => {
      if (type === 'added') {
        followers.push(doc.id);
      }
      if (type === 'removed') {
        const curIndex = followers.indexOf(doc.id);
        curIndex > -1 && followers.splice(curIndex, 1);
      }
    });
    return {
      ...state,
      followers: uniqBy([...followers], item => item),
    };
  })
  .handleAction(setSearchFollows, (state, {payload}) => ({
    ...state,
    searchFollows: payload,
  }))
  .handleAction(setFollows, (state, {payload}) => ({
    ...state,
    follows: payload,
  }));
