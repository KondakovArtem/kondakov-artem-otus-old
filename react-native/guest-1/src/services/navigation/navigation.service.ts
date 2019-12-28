import {NavigationActions, NavigationContainerComponent} from 'react-navigation';

let _navigator: NavigationContainerComponent;

export function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  _navigator = navigatorRef;
}

export function navigate(routeName: string, params?: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
