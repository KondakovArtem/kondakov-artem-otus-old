import {createStore, applyMiddleware, combineReducers, AnyAction} from 'redux';
import thunk, {ThunkDispatch, ThunkAction} from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {reducer as headerReducer, IStore as IHeaderStore} from './header/header.ducks';
import {reducer as guestsReducer, IStore as IGuestsStore} from './guests/guests.ducks';
import {reducer as loginReducer, IStore as ILoginStore} from './login/login.ducks';

const reducer = combineReducers({
  header: headerReducer,
  guests: guestsReducer,
  login: loginReducer,
});

export type IConfiguredStore = {
  header: IHeaderStore;
  guests: IGuestsStore;
  login: ILoginStore;
};

const configuredStore = createStore(reducer, applyMiddleware(thunk, createLogger()));

export type GetStore = () => IConfiguredStore;
export type SimpleThunkDispatch = ThunkDispatch<{}, {}, AnyAction>;
export type SimpleThunkAction = ThunkAction<void, {}, {}, AnyAction>;

export default configuredStore;
