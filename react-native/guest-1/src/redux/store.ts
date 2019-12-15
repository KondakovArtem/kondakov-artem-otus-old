import { createStore, applyMiddleware, combineReducers, AnyAction } from "redux";
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { createLogger } from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as headerReducer, IStore as IHeaderStore } from "./header/header.ducks";
import { reducer as guestsReducer, IStore as IGuestsStore } from "./guests/guests.ducks";

const reducer = combineReducers({
  header: headerReducer,
  guests: guestsReducer
});
export type IConfiguredStore =  {
  header: IHeaderStore;
  guests: IGuestsStore
}


const configuredStore = createStore(reducer,
  //composeWithDevTools(
    applyMiddleware(
      thunk,
      createLogger()
    )
  //)
);

export type GetStore = () => IConfiguredStore;
export type SimpleThunkDispatch = ThunkDispatch<{}, {}, AnyAction>;
export type SimpleThunkAction = ThunkAction< void, {}, {}, AnyAction>;

export default configuredStore;