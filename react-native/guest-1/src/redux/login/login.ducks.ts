import auth from '@react-native-firebase/auth';
import {createReducer, createAction, Action} from 'typesafe-actions';
import {Dispatch} from 'redux';

import {GetStore} from '@app/redux/store';
import {ActionTypes as commonActionsTypes, Actions as commonActions} from '@app/redux/common/common.ducks';
import {NavAliases} from '@app/model/navigation.model';

export const ActionTypes = {
  TOGGLE_SHOW_PASSWORD: '@login/TOGGLE_SHOW_PASSWORD',
  SET_USERNAME: '@login/SET_USERNAME',
  SET_PASSWORD: '@login/SET_PASSWORD',
  SET_IS_AUTH: '@login/SET_IS_AUTH',
};

/////////////////////////////////////////////
// STORE
/////////////////////////////////////////////
export interface IStore {
  showPassword: boolean;
  username: string;
  password: string;
}

const initialState: IStore = {
  showPassword: false,
  username: '',
  password: '',
};

/////////////////////////////////////////////
// ACTIONS
/////////////////////////////////////////////
const toggleShowPassword = createAction(ActionTypes.TOGGLE_SHOW_PASSWORD, () => {})();
const setUsername = createAction(ActionTypes.SET_USERNAME, username => username)();
const setPassword = createAction(ActionTypes.SET_PASSWORD, password => password)();
const signOutClear = createAction(commonActionsTypes.SIGN_OUT_CLEAR, () => {})();

export const Actions = {
  toggleShowPassword: () => (dispatch: Dispatch) => {
    dispatch(toggleShowPassword());
  },
  setUsername: (username: string) => (dispatch: Dispatch) => {
    dispatch(setUsername(username));
  },
  setPassword: (password: string) => (dispatch: Dispatch) => {
    dispatch(setPassword(password));
  },
  signIn: () => async (dispatch: Dispatch, getStore: GetStore) => {
    const {login} = getStore();
    const {username, password} = login;
    if (username && password) {
      try {
        await auth().signInWithEmailAndPassword(username, password);
      } catch (e) {
        console.error(e);
      }
    }
  },
  signOut: () => async () => {
    commonActions.navigate(NavAliases.AUTH_STACK);
    auth().signOut();
  },
};

/////////////////////////////////////////////
// REDUCERS
/////////////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(toggleShowPassword, state => ({...state, showPassword: !state.showPassword}))
  .handleAction(setUsername, (state, {payload}) => ({...state, username: payload}))
  .handleAction(setPassword, (state, {payload}) => ({...state, password: payload}))
  .handleAction(signOutClear, state => ({
    ...state,
    ...initialState,
  }));
