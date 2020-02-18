// import {NAV_STATE_KEY, NavAliases} from 'models/navigation.model';
import {History, Location} from 'history';

let _navigator: History;
let curLocation: Location;

export const navUtils = {
  setTopLevelNavigator: (navigatorRef: History, location: Location) => {
    if (navigatorRef) {
      _navigator = navigatorRef;
      curLocation = location;
    }
  },
  navigate: (routeName: string, params?: any) => {
    if (!_navigator) {
      return;
    }
    _navigator.push(routeName);
  },
  back: () => {
    _navigator.goBack();
  },
  onNavigationChange: (location: Location) => {
    curLocation = location;
  },
  getCurrentScreen: () => {
    return ((curLocation || {}) as any).pathname;
  },
};
