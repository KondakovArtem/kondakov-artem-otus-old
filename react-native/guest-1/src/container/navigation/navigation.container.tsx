import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import {NavigationContainerComponent} from 'react-navigation';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as commonActions} from '@app/redux/common/common.ducks';
import {Navigation} from '@app/navigation/navigation';
import {LoadingScreenComponent} from '@app/screens/loading/loading.screen';

interface IHandlers {
  persistNavigationState: any;
  loadNavigationState: any;
  setTopLevelNavigator: (navigatorRef: NavigationContainerComponent) => void;
}

const NavigationComponent: FunctionComponent<IHandlers> = props => {
  const {loadNavigationState, persistNavigationState, setTopLevelNavigator} = props;
  return (
    <Navigation
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef as NavigationContainerComponent);
      }}
      renderLoadingExperimental={() => <LoadingScreenComponent />}
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
