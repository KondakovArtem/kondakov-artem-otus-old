import {auth, User, UserCredential, AdditionalUserInfo} from 'services/firebase';
import {extend, isEmpty} from 'lodash-es';

import {ThunkAction} from 'store';
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
import {IUserInfo} from 'models/user.model';
import {
  SIGN_UP_SCREEN,
  EMAIL_VERIFICATION,
  MAIN_SCREEN,
  LOGIN_SCREEN,
  NonAuthNavAliases,
} from 'models/navigation.model';
import {FirebaseError} from 'models/firebase.model';

import {Actions as commonActions} from 'store/common/common.actions';
import {Actions as usersActions} from 'store/users/users.actions';
import {Actions as postActions} from 'store/post/post.actions';

import {unregisterAllDbSubsribers} from 'services/database/subscription.service';
import {delay} from 'services/core/core.service';
import {navUtils} from 'services/navigation';
import {onDbUserInfoChanged, createUserInfo} from 'services/database/userinfo.database';
import {message} from 'antd';
import {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';

let authSubscription: () => void;
let queryVerificationHandler: number | undefined;

const Actions = {
  hideSplashScreen: (): ThunkAction => async (...redux) => {
    commonActions.setInited(true)(...redux);
    // SplashScreen.hide();
  },
  initAuth: (): ThunkAction => async (...redux) => {
    if (!authSubscription) {
      authSubscription = auth().onAuthStateChanged(async currentUser => {
        Actions.checkAuth(currentUser)(...redux);
      });
    }
  },
  checkAuth: (currentUser: User | null): ThunkAction => async (dispatch, getStore) => {
    const {authData} = getStore();
    const {userUid} = authData;
    const screen = navUtils.getCurrentScreen();

    if (!currentUser && userUid !== '') {
      dispatch({type: SIGN_OUT_CLEAR});
      dispatch(setFetching(false));
    }

    //Если пользователь авторизован, но не верифицирован
    if (currentUser && !currentUser.emailVerified) {
      Actions.startCheckProcessVerifyEmail()(dispatch, getStore);
      navUtils.navigate(EMAIL_VERIFICATION);
      Actions.hideSplashScreen()(dispatch, getStore);
      return;
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
    if (currentUser && currentUser.emailVerified && NonAuthNavAliases.includes(screen as string)) {
      navUtils.navigate(MAIN_SCREEN);
    }
    Actions.hideSplashScreen()(dispatch, getStore);
  },

  init: (): ThunkAction => async dispatch => {
    onDbUserInfoChanged((info: IUserInfo = {} as IUserInfo) => {
      dispatch(fillUserInfo({info}));
    });
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
  signInGoogle: (data: GoogleLoginResponse | GoogleLoginResponseOffline): ThunkAction => async dispatch => {
    dispatch(setFetching(true));

    try {
      const {tokenId} = data as GoogleLoginResponse;

      const credential = auth.GoogleAuthProvider.credential(tokenId);
      const {additionalUserInfo} = await auth().signInWithCredential(credential);
      const {profile} = additionalUserInfo as AdditionalUserInfo;
      const {email, name, picture} = profile as any;

      await createUserInfo({
        email,
        name,
        avatar: picture,
      });
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setFetching(false));
  },
  signOut: () => async () => {
    navUtils.navigate(LOGIN_SCREEN);
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
      await (credential.user as User).sendEmailVerification();
    } catch (e) {
      // debugger;
    }
    // debugger;
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
            navUtils.navigate(MAIN_SCREEN);
          }
          Actions.stopCheckProcessVerifyEmail()(...redux);
        }
      }, 3000) as any;
    }
  },
  sendUserVerificationEmail: (): ThunkAction => async dispatch => {
    dispatch(setFetching(true));
    const {currentUser} = auth();
    if (currentUser) {
      dispatch(setFetching(true));
      try {
        await currentUser.sendEmailVerification();
      } catch (e) {
        console.error(e);
      }
      dispatch(setFetching(false));
    }
  },
  // takeAvatar: (): ThunkAction => async (dispatch, getStore) => {
  //   const {authData} = getStore();
  //   const {userUid} = authData;
  //   const newAvatar = await takeAvatar(userUid, 'avatar');
  //   if (newAvatar) {
  //     await updateUserInfo({avatar: newAvatar});
  //     // dispatch(setAvatar(newAvatar));
  //   }
  // },
};

export default Actions;
