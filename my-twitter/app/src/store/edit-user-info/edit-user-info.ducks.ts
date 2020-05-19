import {createAction, createReducer, Action} from 'typesafe-actions';

import {IModifiableUserInfo} from 'models/user.model';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';

///////////////////////////////////////
// STORE
///////////////////////////////////////
export interface IStore extends IModifiableUserInfo {}

const initialState: IStore = {
  name: '',
  about: '',
  location: '',
  webSite: '',
  birthDate: undefined,
};

///////////////////////////////////////
// Actions
///////////////////////////////////////

export const SET_NAME = '@editUserInfo/SET_NAME';
export const SET_ABOUT = '@editUserInfo/SET_ABOUT';
export const SET_LOCATION = '@editUserInfo/SET_LOCATION';
export const SET_WEBSITE = '@editUserInfo/SET_WEBSITE';
export const SET_BIRTHDATE = '@editUserInfo/SET_BIRTHDATE';
export const FILL_EDIT_USER_INFO = '@editUserInfo/FILL_EDIT_USER_INFO';

export const setName = createAction(SET_NAME, (v: string) => v)();
export const setLocation = createAction(SET_LOCATION, (v: string) => v)();
export const setAbout = createAction(SET_ABOUT, (v: string) => v)();
export const setWebSite = createAction(SET_WEBSITE, (v: string) => v)();
export const setBirthDate = createAction(SET_BIRTHDATE, (v: Date) => v)();
export const fillEditUserInfo = createAction(FILL_EDIT_USER_INFO, (v: IModifiableUserInfo) => v)();
export const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();

///////////////////////////////////////
// Reducers
///////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(signOutClear, () => ({
    ...initialState,
  }))
  .handleAction(fillEditUserInfo, (state, {payload}) => ({
    ...state,
    ...payload,
  }))
  .handleAction(setName, (state, {payload}) => ({
    ...state,
    name: payload,
  }))
  .handleAction(setLocation, (state, {payload}) => ({
    ...state,
    location: payload,
  }))
  .handleAction(setAbout, (state, {payload}) => ({
    ...state,
    about: payload,
  }))
  .handleAction(setWebSite, (state, {payload}) => ({
    ...state,
    webSite: payload,
  }))
  .handleAction(setBirthDate, (state, {payload}) => ({
    ...state,
    birthDate: payload,
  }));
