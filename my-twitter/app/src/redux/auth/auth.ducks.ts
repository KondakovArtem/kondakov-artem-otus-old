import auth from '@react-native-firebase/auth';
import {createReducer, Action, createAction} from 'typesafe-actions';
import SplashScreen from 'react-native-splash-screen';
// import {GoogleSignin} from '@react-native-community/google-signin';

import {IUserInfo} from '@app/models/user.model';
import {ThunkAction} from '@app/redux/store';
import {Actions as commonActions} from '@app/redux/common/common.ducks';
import {LOGIN_SCREEN, APP_STACK} from '@app/models/navigation.model';

export const ActionTypes = {
  SIGN_OUT_CLEAR: '@auth/SIGN_OUT_CLEAR',
  FILL_USER_INFO: '@auth/FILL_USER_INFO',
  SET_AVATAR: '@auth/SET_AVATAR',
};

const {SIGN_OUT_CLEAR, FILL_USER_INFO, SET_AVATAR} = ActionTypes;

///////////////////////////////////////
// STORE
///////////////////////////////////////
export interface IStore {
  userUid: string;
  info?: IUserInfo;
}

const initialState: IStore = {
  userUid: '',
  info: undefined,
};

let authSubscription: () => void;

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
const fillUserInfo = createAction(FILL_USER_INFO, (data: {userUid: string; info: IUserInfo}) => data)();
const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();
const setAvatar = createAction(SET_AVATAR, (avatar: string) => avatar)();

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
            commonActions.navigate(LOGIN_SCREEN)();
          }
        } else {
          if (currentUser.uid !== userUid) {
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
  }));
