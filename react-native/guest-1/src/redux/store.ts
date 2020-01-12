import {createStore, applyMiddleware, combineReducers, AnyAction} from 'redux';
import thunk, {ThunkDispatch, ThunkAction} from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {reducer as headerReducer, IStore as IHeaderStore} from './header/header.ducks';
import {reducer as guestsReducer, IStore as IGuestsStore} from './guests/guests.ducks';
import {reducer as loginReducer, IStore as ILoginStore} from './login/login.ducks';
import {reducer as commonReducer, IStore as ICommonStore} from './common/common.ducks';

const reducer = combineReducers({
  header: headerReducer,
  guests: guestsReducer,
  login: loginReducer,
  common: commonReducer,
});

export type IConfiguredStore = {
  header: IHeaderStore;
  guests: IGuestsStore;
  login: ILoginStore;
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
export type SimpleThunkDispatch = ThunkDispatch<{}, {}, AnyAction>;
export type SimpleThunkAction = ThunkAction<void, {}, {}, AnyAction>;

export default () => {
  const persistedReducer = persistReducer(persistConfig, reducer);
  let store = createStore(persistedReducer, applyMiddleware(thunk, createLogger()));
  let persistor = persistStore(store);
  return {store, persistor};
};
