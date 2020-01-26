import {createReducer, createAction, Action} from 'typesafe-actions';

import {NavigationActions, NavigationContainerComponent, NavigationState} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import {ThunkAction} from '@app/redux/store';
import {TNavAlias, NAV_STATE_KEY, USER_PROFILE_SCREEN} from '@app/models/navigation.model';
import {Actions as authActions, ActionTypes as authActionsTypes} from '@app/redux/auth/auth.ducks';

export const ActionTypes = {
  NAVIGATE: '@common/NAVIGATE',
};

let _navigator: NavigationContainerComponent;

function navigate(routeName: string, params?: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function resolveNavStateName(navState: NavigationState): string | undefined {
  if (!navState) {
    return undefined;
  }
  const {index, routes} = navState;
  if (routes && routes[index]) {
    return resolveNavStateName(routes[index]);
  }
  return (navState as any).routeName;
}

function getCurrentScreen() {
  return resolveNavStateName((_navigator.state as any).nav as NavigationState);
}

///////////////////////////////////////////
// STORE
///////////////////////////////////////////
export interface IStore {}

const initialState: IStore = {};

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
const signOutClear = createAction(authActionsTypes.SIGN_OUT_CLEAR, () => {})();

export const Actions = {
  navigate: (screen: TNavAlias) => () => {
    navigate(screen);
  },
  loadNavigationState: (): ThunkAction => async (...redux) => {
    const jsonString = (await AsyncStorage.getItem(NAV_STATE_KEY)) as string;
    const data = JSON.parse(jsonString);
    authActions.initAuth()(...redux);
    return data;
  },
  persistNavigationState: (navState: NavigationState) => async () => {
    try {
      await AsyncStorage.setItem(NAV_STATE_KEY, JSON.stringify(navState));
    } catch (err) {
      // handle the error according to your needs
    }
  },
  setTopLevelNavigator: (navigatorRef: NavigationContainerComponent) => async () => {
    _navigator = navigatorRef;
  },

  showProfile: () => async () => {
    Actions.navigate(USER_PROFILE_SCREEN)();
  },
  getCurrentScreen,
};

/////////////////////////////////////////////
/// REDUCERS
/////////////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState).handleAction(signOutClear, state => ({
  ...state,
  ...initialState,
}));
