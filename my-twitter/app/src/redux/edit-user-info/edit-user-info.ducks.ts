import {createAction, createReducer, Action} from 'typesafe-actions';

import {ThunkAction} from '@app/redux/store';
import {IModifiableUserInfo} from '@app/models/user.model';
import {navUtils} from '@app/services/navigation/navigation.service';
import {USER_PROFILE_SCREEN, USER_PROFILE_EDIT_SCREEN} from '@app/models/navigation.model';
import {getUserInfo, updateUserInfo} from '@app/services/database/userinfo.database';

export const SET_NAME = '@editUserInfo/SET_NAME';
export const SET_ABOUT = '@editUserInfo/SET_ABOUT';
export const SET_LOCATION = '@editUserInfo/SET_LOCATION';
export const SET_WEBSITE = '@editUserInfo/SET_WEBSITE';
export const SET_BIRTHDATE = '@editUserInfo/SET_BIRTHDATE';
export const FILL_USER_INFO = '@editUserInfo/FILL_USER_INFO';

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
const setName = createAction(SET_NAME, (v: string) => v)();
const setLocation = createAction(SET_LOCATION, (v: string) => v)();
const setAbout = createAction(SET_ABOUT, (v: string) => v)();
const setWebSite = createAction(SET_WEBSITE, (v: string) => v)();
const setBirthDate = createAction(SET_BIRTHDATE, (v: Date) => v)();
const fillUserInfo = createAction(FILL_USER_INFO, (v: IModifiableUserInfo) => v)();

export const Actions = {
  editUserProfile: (): ThunkAction => async (...redux) => {
    const userInfo = await getUserInfo();
    const {about, birthDate, location, name, webSite} = userInfo;
    Actions.fillUserInfo({
      about,
      birthDate,
      location,
      name,
      webSite,
    })(...redux);
    navUtils.navigate(USER_PROFILE_EDIT_SCREEN);
  },
  saveUserProfile: (): ThunkAction => async (dispatch, getStore) => {
    const {editUserInfo} = getStore();
    const {about, webSite, name, location, birthDate} = editUserInfo;
    await updateUserInfo({
      about,
      webSite,
      name,
      location,
      birthDate,
    });
    navUtils.navigate(USER_PROFILE_SCREEN);
  },
  fillUserInfo: (userInfo: IModifiableUserInfo): ThunkAction => async dispatch => {
    dispatch(fillUserInfo(userInfo));
  },
  setName: (name: string): ThunkAction => dispath => {
    dispath(setName(name));
  },
  setLocation: (location: string): ThunkAction => dispath => {
    dispath(setLocation(location));
  },
  setAbout: (about: string): ThunkAction => dispath => {
    dispath(setAbout(about));
  },
  setWebSite: (webSite: string): ThunkAction => dispath => {
    dispath(setWebSite(webSite));
  },
  setBirthDate: (birthDate: Date): ThunkAction => dispath => {
    dispath(setBirthDate(birthDate));
  },
};

///////////////////////////////////////
// Reducers
///////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(fillUserInfo, (state, {payload}) => ({
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
