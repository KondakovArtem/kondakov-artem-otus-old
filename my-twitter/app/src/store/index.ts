import {createStore, applyMiddleware, combineReducers, Store, Dispatch} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer, createTransform, Persistor} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {reducer as authReducer, IStore as IAuthStore} from 'store/auth/auth.ducks';
import {reducer as commonReducer, IStore as ICommonStore} from 'store/common/common.ducks';
import {reducer as editUserInfoReducer, IStore as IEditUserInfoStore} from 'store/edit-user-info/edit-user-info.ducks';
import {reducer as postReducer, IStore as IPostStore} from 'store/post/post.ducks';
import {reducer as usersReducer, IStore as IUsersStore} from 'store/users/users.ducks';
import {reducer as dialogReducer, IStore as IDialogStore} from 'store/dialog/dialog.ducks';

const reducer = combineReducers({
  authData: authReducer,
  common: commonReducer,
  editUserInfo: editUserInfoReducer,
  post: postReducer,
  users: usersReducer,
  dialog: dialogReducer,
});

export interface IConfiguredStore {
  authData: IAuthStore;
  common: ICommonStore;
  editUserInfo: IEditUserInfoStore;
  post: IPostStore;
  users: IUsersStore;
  dialog: IDialogStore;
}

const replacer = (key: string, value: any) => (value instanceof Date ? value.toISOString() : value);
const reviver = (key: string, value: any) =>
  typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) ? new Date(value) : value;
const encode = (toDeshydrate: any) => JSON.stringify(toDeshydrate, replacer);
const decode = (toRehydrate: any) => {
  return typeof toRehydrate === 'string' ? JSON.parse(toRehydrate, reviver) : toRehydrate;
};

const persistConfig = {
  key: 'root',
  storage: {
    setItem: async (key: string, value: any) => {
      return await AsyncStorage.setItem(key, value);
    },
    getItem: async (key: string) => {
      const res = await AsyncStorage.getItem(key);
      return res;
    },
    removeItem: async (key: string) => {
      return await AsyncStorage.removeItem(key);
    },
  },
  transforms: [createTransform(encode, decode)],
};

export type GetStore = () => IConfiguredStore;
export type ThunkAction = (dispatch: Dispatch, getStore: GetStore) => any;

export interface IDispatchActions {
  [key: string]: (...args: any[]) => ThunkAction;
}

let store: Store;
let persistor: Persistor;

export default () => {
  if (!store || !persistor) {
    const persistedReducer = persistReducer(persistConfig, reducer);
    store = createStore(persistedReducer, applyMiddleware(thunk, createLogger()));
    persistor = persistStore(store);
  }
  return {store, persistor};
};
