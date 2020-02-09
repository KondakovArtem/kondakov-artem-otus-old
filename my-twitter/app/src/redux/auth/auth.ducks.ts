import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createReducer, Action, createAction} from 'typesafe-actions';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {extend, isEmpty} from 'lodash-es';

import {IUserInfo} from '@app/models/user.model';
import {ThunkAction} from '@app/redux/store';
import {GOOGLE_WEB_CLIENT_ID} from '@app/constants/auth';
import {
  LOGIN_SCREEN,
  APP_STACK,
  AUTH_STACK,
  SIGN_UP_SCREEN,
  EMAIL_VERIFICATION,
  AuthNavAliases,
  AppNavAliases,
} from '@app/models/navigation.model';
import {delay} from '@app/services/core/core.service';
import {FirebaseError} from '@app/models/firebase.model';
import {navUtils} from '@app/services/navigation/navigation.service';
import {takeAvatar} from '@app/services/photo/photo.service';
import {unregisterAllDbSubsribers} from '@app/services/database/subscription.service';
import {onDbUserInfoChanged, updateUserInfo} from '@app/services/database/userinfo.database';
import {Actions as postActions} from '@app/redux/post/post.ducks';
import {FILL_USER_INFO} from '@app/redux/edit-user-info/edit-user-info.ducks';
import {
  SIGN_OUT_CLEAR,
  SET_AVATAR,
  SET_PASSWORD,
  SET_REPEAT_PASSWORD,
  SET_USERNAME,
  TOGGLE_SHOW_PASSWORD,
  SET_FETCHING,
  APPEND_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGE,
} from '@app/redux/auth/auth.actions';

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
let queryVerificationHandler: number | undefined;

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
const fillUserInfo = createAction(FILL_USER_INFO, (data: {userUid?: string; info?: IUserInfo}) => data)();
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
  checkAuth: (currentUser: FirebaseAuthTypes.User | null): ThunkAction => async (dispatch, getStore) => {
    const {authData} = getStore();
    const {userUid} = authData;
    const screen = navUtils.getCurrentScreen();

    if (!currentUser && userUid !== '') {
      dispatch({type: SIGN_OUT_CLEAR});
      dispatch(setFetching(false));
    }

    // Если пользователь не авторизован
    if (!currentUser && AuthNavAliases.includes(screen as string)) {
      navUtils.navigate(LOGIN_SCREEN);
      SplashScreen.hide();
      return;
    }

    //Если пользователь авторизован, но не верифицирован
    if (currentUser && !currentUser.emailVerified) {
      Actions.startCheckProcessVerifyEmail();
      if (screen !== EMAIL_VERIFICATION) {
        navUtils.navigate(EMAIL_VERIFICATION);
        SplashScreen.hide();
        return;
      }
    }

    //Если пользователь авторизован и не совпадает по UID из store
    if (currentUser && currentUser.uid !== userUid) {
      unregisterAllDbSubsribers();
      const {uid} = currentUser;
      dispatch(fillUserInfo({userUid: uid}));
    }

    if (currentUser) {
      onDbUserInfoChanged((info: IUserInfo) => {
        dispatch(fillUserInfo({info}));
      });
      postActions.init()(dispatch, getStore);
    }

    // Если пользователь авторизован, верифицирован, но находится в неавторизованной зоне
    if (currentUser && currentUser.emailVerified && !AppNavAliases.includes(screen as string)) {
      navUtils.navigate(APP_STACK);
    }
    SplashScreen.hide();
  },

  initAuth: (): ThunkAction => async (...redux) => {
    if (!authSubscription) {
      authSubscription = auth().onUserChanged(async currentUser => {
        Actions.checkAuth(currentUser)(...redux);
      });
      Actions.checkAuth(auth().currentUser)(...redux);
    } else {
      SplashScreen.hide();
    }
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

  signIn: (): ThunkAction => async (dispatch, getStore) => {
    dispatch(clearInputError());
    const {authData} = getStore();
    const {login} = authData;
    const {password, username} = login;

    dispatch(clearInputError());
    await delay(1);

    const errors = {};
    if (username === '') {
      extend(errors, {username: 'Missing email'});
    }
    if (password === '') {
      extend(errors, {password: 'Missing password'});
    }

    if (!isEmpty(errors)) {
      dispatch(appendInputError(errors));
      return;
    }

    try {
      dispatch(setFetching(true));
      await auth().signInWithEmailAndPassword(username, password);
      // debugger;
    } catch (e) {
      switch (e.code) {
        case FirebaseError.EMAIL_INVALID: {
          extend(errors, {username: 'Wrong email'});
          break;
        }
        case FirebaseError.USER_DISABLED: {
          extend(errors, {username: 'This account is blocked'});
          break;
        }
        case FirebaseError.USER_NOT_FOUND: {
          extend(errors, {username: 'Wrong username or password'});
          break;
        }
        case FirebaseError.WRONG_PASSWORD: {
          extend(errors, {username: 'Wrong username or password'});
          break;
        }
        default: {
          break;
        }
      }
    }
    dispatch(setFetching(false));
    if (!isEmpty(errors)) {
      dispatch(appendInputError(errors));
      return;
    }
  },
  signInGoogle: (): ThunkAction => async dispatch => {
    dispatch(setFetching(true));
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
    try {
      // debugger;
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const data = await GoogleSignin.signIn();
      // debugger;
      const credential = auth.GoogleAuthProvider.credential(data.idToken);
      // login with credential
      const firebaseUserCredential = await auth().signInWithCredential(credential);
      // debugger;
      // this.setState({userInfo});
    } catch (error) {
      // debugger;
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
    navUtils.navigate(AUTH_STACK);
    unregisterAllDbSubsribers();
    auth().signOut();
  },
  toSignUp: (): ThunkAction => async dispatch => {
    dispatch(setPassword(''));
    dispatch(setRepeatPassword(''));
    dispatch(toggleShowPassword(false));
    dispatch(clearInputError());
    dispatch(setFetching(false));
    navUtils.navigate(SIGN_UP_SCREEN);
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
      // debugger;
    } catch (e) {
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
    } catch (e) {
      // debugger;
    }
    // debugger;
    dispatch(setFetching(false));
  },
  stopCheckProcessVerifyEmail: () => {
    if (queryVerificationHandler != null) {
      clearInterval(queryVerificationHandler);
    }
    queryVerificationHandler = undefined;
  },
  startCheckProcessVerifyEmail: () => {
    if (!queryVerificationHandler) {
      queryVerificationHandler = setInterval(async () => {
        console.log('checkProcessVerifyEmail');
        const {currentUser} = auth();
        if (currentUser && !currentUser.emailVerified) {
          await currentUser.reload();
        } else {
          if (currentUser && navUtils.getCurrentScreen() === EMAIL_VERIFICATION) {
            navUtils.navigate(APP_STACK);
          }
          Actions.stopCheckProcessVerifyEmail();
        }
      }, 3000);
    }
  },
  sendUserVerificationEmail: (): ThunkAction => async dispatch => {
    dispatch(setFetching(true));
    const {currentUser} = auth();
    if (currentUser) {
      dispatch(setFetching(true));
      try {
        await currentUser.sendEmailVerification();
      } catch (e) {}
      dispatch(setFetching(false));
    }
  },
  takeAvatar: (): ThunkAction => async (dispatch, getStore) => {
    const {authData} = getStore();
    const {userUid} = authData;
    const newAvatar = await takeAvatar(userUid, 'avatar');
    if (newAvatar) {
      await updateUserInfo({avatar: newAvatar});
      // dispatch(setAvatar(newAvatar));
    }
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
