import {createStore, applyMiddleware, combineReducers, Store, Dispatch} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer, Persistor} from 'redux-persist';
import persistConfig from 'services/redux-persist';

import authReducer, {IStore as IAuthStore} from 'store/auth/auth.ducks';
import commonReducer, {IStore as ICommonStore} from 'store/common/common.ducks';
import editUserInfoReducer, {IStore as IEditUserInfoStore} from 'store/edit-user-info/edit-user-info.ducks';
import postReducer, {IStore as IPostStore} from 'store/post/post.ducks';
import usersReducer, {IStore as IUsersStore} from 'store/users/users.ducks';
//import {reducer as dialogReducer, IStore as IDialogStore} from '@app/redux/dialog/dialog.ducks';

const reducer = combineReducers({
  authData: authReducer,
  common: commonReducer,
  editUserInfo: editUserInfoReducer,
  post: postReducer,
  users: usersReducer,
  // dialog: dialogReducer,
});

export interface IConfiguredStore {
  authData: IAuthStore;
  common: ICommonStore;
  editUserInfo: IEditUserInfoStore;
  post: IPostStore;
  users: IUsersStore;
  // dialog: IDialogStore;
}

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
