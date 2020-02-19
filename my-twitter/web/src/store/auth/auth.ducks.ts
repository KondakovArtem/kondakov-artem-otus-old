import {createReducer, Action, createAction} from 'typesafe-actions';
import {IUserInfo} from 'models/user.model';

///////////////////////////////////////
// STORE
///////////////////////////////////////
export interface IStore {
  userUid: string;
  info?: IUserInfo;
  login: {
    username: string;
    password: string;
    repeatPassword: string;
    showPassword: boolean;
    isFetching: boolean;
    errors: {
      [key: string]: string;
    };
  };
}

export const initialState: IStore = {
  userUid: '',
  info: undefined,
  login: {
    username: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    isFetching: false,
    errors: {},
  },
};

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////

export const SIGN_OUT_CLEAR = '@auth/SIGN_OUT_CLEAR';
export const FILL_USER_INFO = '@auth/FILL_USER_INFO';
export const SET_AVATAR = '@auth/SET_AVATAR';
export const SET_USERNAME = '@auth/SET_USERNAME';
export const SET_PASSWORD = '@auth/SET_PASSWORD';
export const SET_REPEAT_PASSWORD = '@auth/SET_REPEAT_PASSWORD';
export const TOGGLE_SHOW_PASSWORD = '@auth/TOGGLE_SHOW_PASSWORD';
export const SET_FETCHING = '@auth/SET_FETCHING';
export const APPEND_ERROR_MESSAGE = '@auth/APPEND_ERROR_MESSAGE';
export const CLEAR_ERROR_MESSAGE = '@auth/CLEAR_ERROR_MESSAGE';

export const fillUserInfo = createAction(FILL_USER_INFO, (data: {userUid?: string; info?: IUserInfo}) => data)();
export const signOutClear = createAction(SIGN_OUT_CLEAR)();
export const setAvatar = createAction(SET_AVATAR, (avatar: string) => avatar)();
export const setPassword = createAction(SET_PASSWORD, (v: string) => v)();
export const setRepeatPassword = createAction(SET_REPEAT_PASSWORD, (v: string) => v)();
export const setUsername = createAction(SET_USERNAME, (v: string) => v)();
export const toggleShowPassword = createAction(TOGGLE_SHOW_PASSWORD, (v?: boolean) => v)();
export const setFetching = createAction(SET_FETCHING, (v: boolean) => v)();
export const appendInputError = createAction(APPEND_ERROR_MESSAGE, v => v)();
export const clearInputError = createAction(CLEAR_ERROR_MESSAGE)();

/////////////////////////////////////////////
/// REDUCERS
/////////////////////////////////////////////
export default createReducer<IStore, Action>(initialState)
  .handleAction(signOutClear, () => ({
    ...initialState,
  }))
  .handleAction(fillUserInfo, (state, {payload}) => ({...state, ...payload}))
  .handleAction(setAvatar, (state, {payload}) => ({
    ...state,
    info: {
      ...(state.info as IUserInfo),
      avatar: payload,
    },
  }))
  .handleAction(appendInputError, (state, {payload}) => ({
    ...state,
    login: {
      ...state.login,
      errors: {
        ...state.login.errors,
        ...payload,
      },
    },
  }))
  .handleAction(clearInputError, state => ({
    ...state,
    login: {
      ...state.login,
      errors: {},
    },
  }))
  .handleAction(setPassword, (state, {payload}) => ({
    ...state,
    login: {
      ...state.login,
      password: payload,
    },
  }))
  .handleAction(setRepeatPassword, (state, {payload}) => ({
    ...state,
    login: {
      ...state.login,
      repeatPassword: payload,
    },
  }))
  .handleAction(setUsername, (state, {payload}) => ({
    ...state,
    login: {
      ...state.login,
      username: payload,
    },
  }))
  .handleAction(toggleShowPassword, (state, {payload}) => ({
    ...state,
    login: {
      ...state.login,
      showPassword: payload != null ? payload : !state.login.showPassword,
    },
  }))
  .handleAction(setFetching, (state, {payload}) => ({
    ...state,
    login: {
      ...state.login,
      isFetching: payload,
    },
  }));
