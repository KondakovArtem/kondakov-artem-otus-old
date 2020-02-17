import {createReducer, createAction, Action} from 'typesafe-actions';

import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';

///////////////////////////////////////////
// STORE
///////////////////////////////////////////
export interface IStore {
  screen: string;
  inited: boolean;
}
const initialState: IStore = {
  screen: '',
  inited: false,
};

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
export const SET_SCREEN = '@common/SET_SCREEN';
export const SET_INITED = '@common/SET_INITED';

export const signOutClear = createAction(SIGN_OUT_CLEAR)();
export const setScreen = createAction(SET_SCREEN, (v: string) => v)();
export const setInited = createAction(SET_INITED, (v: boolean) => v)();

/////////////////////////////////////////////
/// REDUCERS
/////////////////////////////////////////////
export default createReducer<IStore, Action>(initialState)
  .handleAction(signOutClear, () => ({
    ...initialState,
    inited: true,
  }))
  .handleAction(setScreen, (state, {payload}) => ({
    ...state,
    screen: payload,
  }))
  .handleAction(setInited, (state, {payload}) => ({
    ...state,
    inited: payload,
  }));
