import {createReducer, createAction, Action} from 'typesafe-actions';
import {NavigationContainerComponent, NavigationState, NavigationAction} from 'react-navigation';

import {ThunkAction} from '@app/redux/store';
import {USER_PROFILE_SCREEN, EXPLORE_SCREEN, FOLLOW_SCREEN} from '@app/models/navigation.model';
import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {navUtils} from '@app/services/navigation/navigation.service';
import {SIGN_OUT_CLEAR} from '@app/redux/auth/auth.actions';
import {isEmpty} from 'lodash-es';
import {IUserInfo} from '@app/models/user.model';

///////////////////////////////////////////
// STORE
///////////////////////////////////////////
export interface IStore {
  locale: string;
}
const initialState: IStore = {
  locale: '',
};

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();

export const Actions = {
  loadNavigationState: (): ThunkAction => async (...redux) => {
    navUtils.onNavigationInited().then(() => {
      authActions.initAuth()(...redux);
    });
    return await navUtils.loadNavigationState();
  },
  persistNavigationState: (navState: NavigationState) => async () => {
    return navUtils.persistNavigationState(navState);
  },
  setTopLevelNavigator: (navigatorRef: NavigationContainerComponent) => async () => {
    navUtils.setTopLevelNavigator(navigatorRef);
  },
  showProfile: () => async () => {
    navUtils.navigate(USER_PROFILE_SCREEN);
  },
  onNavigationStateChange: (
    prevNavigationState: NavigationState,
    nextNavigationState: NavigationState,
    action: NavigationAction,
  ): ThunkAction => async (dispatch, getStore) => {
    prevNavigationState;
    nextNavigationState;
    action;

    const {users} = getStore();
    const {follows = []} = users;

    if ((action as any).routeName === EXPLORE_SCREEN && isEmpty(follows)) {
      navUtils.navigate(FOLLOW_SCREEN);
    }
  },
};

/////////////////////////////////////////////
/// REDUCERS
/////////////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState).handleAction(signOutClear, state => ({
  ...state,
  ...initialState,
}));
