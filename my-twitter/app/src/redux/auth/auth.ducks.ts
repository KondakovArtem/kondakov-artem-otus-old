import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createReducer, Action, createAction} from 'typesafe-actions';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {extend, isEmpty} from 'lodash-es';

import {IUserInfo} from '@app/models/user.model';
import {ThunkAction} from '@app/redux/store';
import {Actions as commonActions} from '@app/redux/common/common.ducks';
import {GOOGLE_WEB_CLIENT_ID} from '@app/constants/auth';
import {LOGIN_SCREEN, APP_STACK, AUTH_STACK, SIGN_UP_SCREEN, EMAIL_VERIFICATION, VERIFICATION_STACK} from '@app/models/navigation.model';
import {delay} from '@app/services/core/core.service';
import {FirebaseError} from '@app/models/firebase.model';

export const ActionTypes = {
  SIGN_OUT_CLEAR: '@auth/SIGN_OUT_CLEAR',
  FILL_USER_INFO: '@auth/FILL_USER_INFO',
  SET_AVATAR: '@auth/SET_AVATAR',
  SET_USERNAME: '@auth/SET_USERNAME',
  SET_PASSWORD: '@auth/SET_PASSWORD',
  SET_REPEAT_PASSWORD: '@auth/SET_REPEAT_PASSWORD',
  TOGGLE_SHOW_PASSWORD: '@auth/TOGGLE_SHOW_PASSWORD',
  SET_FETCHING: '@auth/SET_FETCHING',
  APPEND_ERROR_MESSAGE: '@auth/APPEND_ERROR_MESSAGE',
  CLEAR_ERROR_MESSAGE: '@auth/CLEAR_ERROR_MESSAGE',
};

const {
  SIGN_OUT_CLEAR,
  FILL_USER_INFO,
  SET_AVATAR,
  SET_PASSWORD,
  SET_REPEAT_PASSWORD,
  SET_USERNAME,
  TOGGLE_SHOW_PASSWORD,
  SET_FETCHING,
  APPEND_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGE,
} = ActionTypes;

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

const initialState: IStore = {
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

let authSubscription: () => void;
let queryVerificationHandler: number;

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
const fillUserInfo = createAction(FILL_USER_INFO, (data: {userUid: string; info: IUserInfo}) => data)();
const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();
const setAvatar = createAction(SET_AVATAR, (avatar: string) => avatar)();
const setPassword = createAction(SET_PASSWORD, (v: string) => v)();
const setRepeatPassword = createAction(SET_REPEAT_PASSWORD, (v: string) => v)();
const setUsername = createAction(SET_USERNAME, (v: string) => v)();
const toggleShowPassword = createAction(TOGGLE_SHOW_PASSWORD, (v?: boolean) => v)();
const setFetching = createAction(SET_FETCHING, (v: boolean) => v)();
const appendInputError = createAction(APPEND_ERROR_MESSAGE, v => v)();
const clearInputError = createAction(CLEAR_ERROR_MESSAGE, () => {})();

export const Actions = {
  checkIsAuth: (): ThunkAction => (dispatch, getStore) => {
    const {currentUser} = auth();
    const {authData} = getStore();
    const {userUid} = authData;
    if (currentUser && currentUser.uid === userUid) {
      return true;
    }
    return false;
  },
  initAuth: (): ThunkAction => async (dispatch, getStore) => {
    if (!authSubscription) {
      authSubscription = auth().onUserChanged(async currentUser => {
        const {authData} = getStore();
        const {userUid} = authData;
        const screen = commonActions.getCurrentScreen();

        if (!currentUser) {
          if (userUid !== '' || screen !== LOGIN_SCREEN) {
            dispatch({type: ActionTypes.SIGN_OUT_CLEAR});
            dispatch(setFetching(false));
            commonActions.navigate(LOGIN_SCREEN)();
          }
        } else {
          if (!currentUser.emailVerified) {
            if (screen !== EMAIL_VERIFICATION) {
              commonActions.navigate(VERIFICATION_STACK)();
            }
            return;
          } else if (currentUser.uid !== userUid) {
            dispatch({
              type: ActionTypes.FILL_USER_INFO,
              payload: {
                userUid: currentUser.uid,
                info: {
                  initial: currentUser.email?.substr(0, 2).toUpperCase(),
                  // avatar: await getStorageFileUrl(`${currentUser.uid}/avatar`),
                } as IUserInfo,
              },
            });
          }
          if (screen === LOGIN_SCREEN) {
            commonActions.navigate(APP_STACK)();
          }
        }
      });
    }
    SplashScreen.hide();
  },
  toggleShowPassword: (): ThunkAction => dispatch => {
    dispatch(toggleShowPassword());
  },
  setUsername: (username: string): ThunkAction => dispatch => {
    dispatch(setUsername(username));
  },
  setPassword: (password: string): ThunkAction => dispatch => {
    dispatch(setPassword(password));
  },
  setRepeatPassword: (password: string): ThunkAction => dispatch => {
    dispatch(setRepeatPassword(password));
  },

  signIn: (): ThunkAction => dispatch => {
    dispatch(setFetching(true));
  },
  signInGoogle: (): ThunkAction => async dispatch => {
    dispatch(setFetching(true));
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
    try {
      debugger;
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const data = await GoogleSignin.signIn();
      debugger;
      const credential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // login with credential
      const firebaseUserCredential = await auth().signInWithCredential(credential);
      debugger;
      // this.setState({userInfo});
    } catch (error) {
      debugger;
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    dispatch(setFetching(false));
  },
  signOut: () => async () => {
    commonActions.navigate(AUTH_STACK)();
    auth().signOut();
  },
  toSignUp: (): ThunkAction => async dispatch => {
    dispatch(setPassword(''));
    dispatch(setRepeatPassword(''));
    dispatch(toggleShowPassword(false));
    dispatch(clearInputError());
    dispatch(setFetching(false));
    commonActions.navigate(SIGN_UP_SCREEN)();
  },
  createAccount: (): ThunkAction => async (dispatch, getStore) => {
    const {authData} = getStore();
    const {login} = authData;
    const {password, repeatPassword, username} = login;

    dispatch(clearInputError());
    await delay(1);

    const errors = {};
    if (username === '') {
      extend(errors, {username: 'Missing email'});
    }
    if (password === '') {
      extend(errors, {password: 'Missing password'});
    }
    if (repeatPassword === '') {
      extend(errors, {repeatPassword: 'Missing repeat password'});
    }

    if (!isEmpty(errors)) {
      dispatch(appendInputError(errors));
      return;
    }

    if (password !== repeatPassword) {
      extend(errors, {repeatPassword: 'Repeat error password mismatch'});
    }

    if (!isEmpty(errors)) {
      dispatch(appendInputError(errors));
      return;
    }

    let credential: FirebaseAuthTypes.UserCredential;
    try {
      dispatch(setFetching(true));
      credential = await auth().createUserWithEmailAndPassword(username, password);
      debugger;
    } catch (e) {
      e;
      switch (e.code) {
        case FirebaseError.EMAIL_INVALID: {
          extend(errors, {username: 'Wrong email'});
          break;
        }
        case FirebaseError.EMAIL_ALREADY_IN_USE: {
          extend(errors, {username: 'Email already in use'});
          break;
        }
        case FirebaseError.WEAK_PASSWORD: {
          extend(errors, {password: 'Password is too weak'});
          break;
        }
        default: {
          break;
        }
      }
      if (!isEmpty(errors)) {
        dispatch(appendInputError(errors));
      }
      dispatch(setFetching(false));
      return;
    }
    try {
      await credential.user.sendEmailVerification();
      queryVerificationHandler = setTimeout(async () => {
        await credential.user.reload();
        const {currentUser} = auth();
        if (!currentUser || currentUser.emailVerified) {
          clearInterval(queryVerificationHandler);
          if (currentUser?.emailVerified) {
            debugger;
          }
        }
      }, 3000);
    } catch (e) {
      debugger;
    }
    debugger;
    dispatch(setFetching(false));
  },
};

/////////////////////////////////////////////
/// REDUCERS
/////////////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(fillUserInfo, (state, {payload}) => ({...state, ...payload}))
  .handleAction(signOutClear, state => ({
    ...state,
    ...initialState,
  }))
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
