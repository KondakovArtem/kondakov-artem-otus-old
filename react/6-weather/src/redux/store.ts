import { createStore, applyMiddleware, combineReducers, AnyAction } from "redux";
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as messageReducer, IStore as IMessageStore } from "./message/message.ducks";
import { reducer as cityWeatherReducer, IStore as ICityWeatherStore } from "./cityWeather/cityWeather.ducks";
import { reducer as searchReducer, IStore as ISearchStore } from "./search/search.ducks";

const reducer = combineReducers({
  messages: messageReducer,
  cityWeather: cityWeatherReducer,
  search: searchReducer
});
export type IConfiguredStore =  {
  messages: IMessageStore;
  cityWeather: ICityWeatherStore;
  search: ISearchStore;
}

//ReturnType<typeof reducer>

const configuredStore = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      createLogger()
    )
  )
);

export type GetStore = () => IConfiguredStore;
export type SimpleThunkDispatch = ThunkDispatch<{}, {}, AnyAction>;
export type SimpleThunkAction = ThunkAction< void, {}, {}, AnyAction>;

export default configuredStore;