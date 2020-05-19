import {NavigationContainerComponent, NavigationState, NavigationAction} from 'react-navigation';
import {isEmpty} from 'lodash-es';

import {ThunkAction} from 'store';
import {USER_PROFILE_SCREEN, EXPLORE_SCREEN, FOLLOW_SCREEN} from 'models/navigation.model';
import authActions from 'store/auth/auth.actions';
import {navUtils} from 'services/navigation/navigation.service';
import {setScreen} from 'store/common/common.ducks';

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
    const {routeName} = action as any;

    const navAlias = navUtils.resolveScreenAlias(nextNavigationState);
    dispatch(setScreen(navAlias as string));

    if (routeName === EXPLORE_SCREEN && isEmpty(follows)) {
      navUtils.navigate(FOLLOW_SCREEN);
    }
  },
};
