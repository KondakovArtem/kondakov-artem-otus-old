import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';

import {IConfiguredStore} from '@app/redux/store';

import {Actions as authActions} from '@app/redux/auth/auth.ducks';

interface IProps {}
interface IHandlers {
  signOut: () => void;
}

export const MainScreenComponent: FC<IProps & IHandlers> = props => {
  const {signOut} = props;
  return <Text onPress={signOut}>123</Text>;
};

export const MainScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  () => {
    return {};
  },
  {
    signOut: authActions.signOut,
  },
)(MainScreenComponent);
