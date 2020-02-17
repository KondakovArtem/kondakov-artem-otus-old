import {createReducer, createAction, Action} from 'typesafe-actions';

import {TNavAlias} from 'models/navigation.model';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';

///////////////////////////////////////////
// STORE
///////////////////////////////////////////
export interface IStore {
  screen: string;
}
const initialState: IStore = {
  screen: '',
};

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
export const SET_SCREEN = '@common/SET_SCREEN';

export const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();
export const setScreen = createAction(SET_SCREEN, (v: TNavAlias) => v)();

/////////////////////////////////////////////
/// REDUCERS
/////////////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(signOutClear, () => ({
    ...initialState,
  }))
  .handleAction(setScreen, (state, {payload}) => ({
    ...state,
    screen: payload,
  }));
