import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Dispatch} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {reducer as authReducer, IStore as IAuthStore} from '@app/redux/auth/auth.ducks';
import {reducer as commonReducer, IStore as ICommonStore} from '@app/redux/common/common.ducks';

const reducer = combineReducers({
  authData: authReducer,
  common: commonReducer,
});

export type IConfiguredStore = {
  authData: IAuthStore;
  common: ICommonStore;
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
};

export type GetStore = () => IConfiguredStore;
export type ThunkAction = (dispatch: Dispatch, getStore: GetStore) => any;

export default () => {
  const persistedReducer = persistReducer(persistConfig, reducer);
  let store = createStore(persistedReducer, applyMiddleware(thunk, createLogger()));
  let persistor = persistStore(store);
  return {store, persistor};
};
