import React, {FC} from 'react';
import {connect} from 'react-redux';
import {NavigationContainerComponent} from 'react-navigation';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as commonActions} from '@app/redux/common/common.ducks';
import {Navigation} from '@app/navigation/navigation';

interface IHandlers {
  persistNavigationState: any;
  loadNavigationState: any;
  setTopLevelNavigator(navigatorRef: NavigationContainerComponent): void;
}

const NavigationComponent: FC<IHandlers> = props => {
  const {loadNavigationState, persistNavigationState, setTopLevelNavigator} = props;
  return (
    <Navigation
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef as NavigationContainerComponent);
      }}
      loadNavigationState={loadNavigationState}
      persistNavigationState={persistNavigationState}
    />
  );
};

export const NavigationContainer = connect<{}, IHandlers, {}, IConfiguredStore>(() => ({}), {
  persistNavigationState: commonActions.persistNavigationState,
  loadNavigationState: commonActions.loadNavigationState,
  setTopLevelNavigator: commonActions.setTopLevelNavigator,
})(NavigationComponent);
