import {createAction, createReducer, Action} from 'typesafe-actions';
import Fuse, {FuseOptions} from 'fuse.js';
import {map, isEmpty} from 'lodash-es';

import {ThunkAction} from '@app/redux/store';
import {IUserInfo, IUserInfoMutation} from '@app/models/user.model';
import {navUtils} from '@app/services/navigation/navigation.service';
import {onDbUsersChanged, toggleFollowDb} from '@app/services/database/userinfo.database';
import {FOLLOW_SCREEN} from '@app/models/navigation.model';
import {SIGN_OUT_CLEAR} from '@app/redux/auth/auth.actions';

export const SET_SEARCH = '@follows/SET_SEARCH';
export const SET_SEARCH_FOLLOWS = '@follows/SET_SEARCH_FOLLOWS';
export const MUTATE_USERS = '@follows/MUTATE_USERS';

///////////////////////////////////////
// STORE
///////////////////////////////////////
export interface IStore {
  search: string;
  userInfoMap: {
    [key: string]: IUserInfo;
  };
  searchFollows: IUserInfo[];
}

const initialState: IStore = {
  search: '',
  searchFollows: [],
  userInfoMap: {},
};

///////////////////////////////////////
// Actions
///////////////////////////////////////
const setSearch = createAction(SET_SEARCH, (v: string) => v)();
const setSearchFollows = createAction(SET_SEARCH_FOLLOWS, (v: IUserInfo[]) => v)();
const mutateUsers = createAction(MUTATE_USERS, (v: IUserInfoMutation[]) => v)();
const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();

export const Actions = {
  init: (): ThunkAction => async (dispatch, getStore) => {
    onDbUsersChanged((userInfoMutations: IUserInfoMutation[]) => {
      dispatch(mutateUsers(userInfoMutations));
      if (navUtils.getCurrentScreen() === FOLLOW_SCREEN) {
        Actions.filterFollows()(dispatch, getStore);
      }
    });
  },
  filterFollows: (): ThunkAction => async (dispatch, getStore) => {
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
    Actions.filterFollows()(dispatch, getStore);
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
  .handleAction(setSearchFollows, (state, {payload}) => ({
    ...state,
    searchFollows: payload,
  }));
