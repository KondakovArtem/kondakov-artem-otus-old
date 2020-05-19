import React, {FC} from 'react';
import {connect} from 'react-redux';
import {NavigationContainerComponent, NavigationState, NavigationAction} from 'react-navigation';

import {IConfiguredStore} from 'store';
import {Actions as commonActions} from 'store/common/common.actions';
import {Navigation} from 'navigation/navigation';

interface IHandlers {
  persistNavigationState: any;
  loadNavigationState: any;
  setTopLevelNavigator(navigatorRef: NavigationContainerComponent): void;
  onNavigationStateChange(
    prevNavigationState: NavigationState,
    nextNavigationState: NavigationState,
    action: NavigationAction,
  ): void;
}

const NavigationComponent: FC<IHandlers> = ({
  loadNavigationState,
  persistNavigationState,
  setTopLevelNavigator,
  onNavigationStateChange,
}) => {
  return (
    <Navigation
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef as NavigationContainerComponent);
      }}
      loadNavigationState={loadNavigationState}
      persistNavigationState={persistNavigationState}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

export const NavigationContainer = connect<{}, IHandlers, {}, IConfiguredStore>(() => ({}), {
  persistNavigationState: commonActions.persistNavigationState,
  loadNavigationState: commonActions.loadNavigationState,
  setTopLevelNavigator: commonActions.setTopLevelNavigator,
  onNavigationStateChange: commonActions.onNavigationStateChange,
})(NavigationComponent);
