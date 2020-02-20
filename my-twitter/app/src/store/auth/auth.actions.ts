import {User, AdditionalUserInfo} from 'services/firebase';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {extend, isEmpty} from 'lodash-es';

import {IUserInfo} from 'models/user.model';
import {ThunkAction} from 'store';
import {GOOGLE_WEB_CLIENT_ID} from 'constants/auth';
import {
  LOGIN_SCREEN,
  APP_STACK,
  AUTH_STACK,
  SIGN_UP_SCREEN,
  EMAIL_VERIFICATION,
  AuthNavAliases,
  AppNavAliases,
  LOADING_SCREEN,
} from 'models/navigation.model';
import {delay, showErrorMessage} from 'services/core/core.service';
import {FirebaseError} from 'models/firebase.model';
import {navUtils} from 'services/navigation/navigation.service';
import {takeAvatar} from 'services/photo/photo.service';
import {unregisterAllDbSubsribers} from 'services/database/subscription.service';
import {onDbUserInfoChanged, updateUserInfo, createUserInfo} from 'services/database/userinfo.database';
import {Actions as postActions} from 'store/post/post.actions';
import {Actions as usersActions} from 'store/users/users.actions';
import {
  SIGN_OUT_CLEAR,
  setFetching,
  fillUserInfo,
  toggleShowPassword,
  setUsername,
  setPassword,
  setRepeatPassword,
  clearInputError,
  appendInputError,
} from 'store/auth/auth.ducks';
import {UserCredential, auth} from 'services/firebase';

let authSubscription: () => void;
let queryVerificationHandler: number | undefined;

const Actions = {
  checkAuth: (currentUser: User | null): ThunkAction => async (dispatch, getStore) => {
    const {authData} = getStore();
    const {userUid} = authData;
    const screen = navUtils.getCurrentScreen();

    if (!currentUser && userUid !== '') {
      dispatch({type: SIGN_OUT_CLEAR});
      dispatch(setFetching(false));
    }

    // Если пользователь не авторизован
    if (!currentUser && [...AuthNavAliases, LOADING_SCREEN].includes(screen as string)) {
      navUtils.navigate(LOGIN_SCREEN);
      SplashScreen.hide();
      return;
    }

    //Если пользователь авторизован, но не верифицирован
    if (currentUser && !currentUser.emailVerified) {
      Actions.startCheckProcessVerifyEmail()(dispatch, getStore);
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
      Actions.init()(dispatch, getStore);
      usersActions.init()(dispatch, getStore);
      postActions.init()(dispatch, getStore);
    }

    // Если пользователь авторизован, верифицирован, но находится в неавторизованной зоне
    if (currentUser && currentUser.emailVerified && !AppNavAliases.includes(screen as string)) {
      navUtils.navigate(APP_STACK);
    }
    SplashScreen.hide();
  },

  init: (): ThunkAction => async dispatch => {
    onDbUserInfoChanged((info: IUserInfo = {} as IUserInfo) => {
      dispatch(fillUserInfo({info}));
    });
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
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
      });
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const data = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(data.idToken);

      const {additionalUserInfo} = await auth().signInWithCredential(credential);
      const {profile} = additionalUserInfo as AdditionalUserInfo;
      const {email, name, picture} = profile as any;

      await createUserInfo({
        email,
        name,
        avatar: picture,
      });
    } catch (error) {
      let errorMessage = '';

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorMessage = 'Authorization already in progress';
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Google Play service is not available';
        // play services not available or outdated
      } else {
        errorMessage = `${error.code} - ${error.message}`;
        // some other error happened
      }
      showErrorMessage(errorMessage);
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

    let credential: UserCredential;
    try {
      dispatch(setFetching(true));
      credential = await auth().createUserWithEmailAndPassword(username, password);
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
    await createUserInfo({});

    try {
      await credential.user.sendEmailVerification();
    } catch (e) {}
    dispatch(setFetching(false));
  },
  stopCheckProcessVerifyEmail: (): ThunkAction => () => {
    if (queryVerificationHandler != null) {
      clearInterval(queryVerificationHandler);
    }
    queryVerificationHandler = undefined;
  },
  startCheckProcessVerifyEmail: (): ThunkAction => (...redux) => {
    if (!queryVerificationHandler) {
      queryVerificationHandler = setInterval(async () => {
        const {currentUser} = auth();
        if (currentUser && !currentUser.emailVerified) {
          await currentUser.reload();
        } else {
          if (currentUser && navUtils.getCurrentScreen() === EMAIL_VERIFICATION) {
            Actions.checkAuth(currentUser)(...redux);
            navUtils.navigate(APP_STACK);
          }
          Actions.stopCheckProcessVerifyEmail()(...redux);
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
    }
  },
};

export default Actions;
