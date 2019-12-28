import auth from '@react-native-firebase/auth';
import {createReducer, createAction, Action} from 'typesafe-actions';
import {Dispatch} from 'redux';

import {GetStore} from '../store';
import {navigate} from '../../services/navigation/navigation.service';
import {NavAliases} from '../../model/navigation.model';
import {ActionTypes as commonActionsTypes} from '../common/common.ducks';
import {IUserInfo} from '../../model/login.model';

export const ActionTypes = {
  TOGGLE_SHOW_PASSWORD: '@login/TOGGLE_SHOW_PASSWORD',
  SET_USERNAME: '@login/SET_USERNAME',
  SET_PASSWORD: '@login/SET_PASSWORD',
  SET_IS_AUTH: '@login/SET_IS_AUTH',
  SET_USER_UID: '@login/SET_USER_UID',
  SET_USER_INFO: '@login/SET_USER_INFO',
};

/////////////////////////////////////////////
// STORE
/////////////////////////////////////////////
export interface IStore {
  showPassword: boolean;
  username: string;
  password: string;
  userUid: string;
  info?: IUserInfo;
}

const initialState: IStore = {
  showPassword: false,
  username: '',
  password: '',
  userUid: '',
  info: undefined,
};

/////////////////////////////////////////////
// ACTIONS
/////////////////////////////////////////////
const toggleShowPassword = createAction(ActionTypes.TOGGLE_SHOW_PASSWORD, () => {})();
const setUsername = createAction(ActionTypes.SET_USERNAME, username => username)();
const setPassword = createAction(ActionTypes.SET_PASSWORD, password => password)();
const setUserUid = createAction(ActionTypes.SET_USER_UID, uid => uid)();
const setUserInfo = createAction(ActionTypes.SET_USER_INFO, info => info)();
const signOutClear = createAction(commonActionsTypes.SIGN_OUT_CLEAR, () => {})();

let authSubscription: () => void;

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

  initSign: () => async (dispatch: Dispatch) => {
    if (!authSubscription) {
      authSubscription = auth().onUserChanged(() => {
        Actions.onCheckAuth()(dispatch);
      });
    }
    Actions.onCheckAuth()(dispatch);
  },
  signIn: () => async (dispatch: Dispatch, getStore: GetStore) => {
    const {login} = getStore();
    const {username, password} = login;
    if (username && password) {
      try {
        await auth().signInWithEmailAndPassword(username, password);
      } catch (e) {
        console.error(e);
        return;
      }
      Actions.onCheckAuth()(dispatch);
    }
  },
  onCheckAuth: () => async (dispatch: Dispatch) => {
    const {currentUser} = auth();
    if (currentUser) {
      dispatch(setUserUid(currentUser.uid));
      dispatch(
        setUserInfo({
          initial: currentUser.email?.substr(0, 2).toUpperCase(),
        }),
      );
      navigate(NavAliases.APP_STACK);
    } else {
      dispatch({type: commonActionsTypes.SIGN_OUT_CLEAR});
      navigate(NavAliases.AUTH_STACK);
    }
  },
  signOut: () => async () => {
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
  .handleAction(setUserUid, (state, {payload}) => ({...state, userUid: payload}))
  .handleAction(signOutClear, state => ({
    ...state,
    ...initialState,
  }))
  .handleAction(setUserInfo, (state, {payload}) => ({...state, info: payload}));
