import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {IConfiguredStore} from '@app/redux/store';

import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {UserAvatar} from '@app/containers/user-avatar/user-avatar.container';

interface IProps {}
interface IHandlers {
  signOut: () => void;
}

export const ExploreScreenComponent: FC<IProps & IHandlers> = props => {
  const {signOut} = props;
  return <Text onPress={signOut}>Explore</Text>;
};

export const ExploreScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  () => {
    return {};
  },
  {
    signOut: authActions.signOut,
  },
)(ExploreScreenComponent);
