import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {IConfiguredStore} from '@app/redux/store';

import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {HeaderComponent} from '@app/components/header/header.component';
import {UserAvatar} from '@app/containers/user-avatar/user-avatar.container';
import {navUtils} from '@app/services/navigation/navigation.service';
import {USER_PROFILE_SCREEN} from '@app/models/navigation.model';
import {AddPostButtonComponent} from '@app/components/add-post-button/add-post-button.component';

interface IProps {}
interface IHandlers {
  signOut(): void;
  toUserProfile(): void;
}

export const MainScreenComponent: FC<IProps & IHandlers> = props => {
  const {signOut, toUserProfile} = props;
  return (
    <MagicMove.Scene>
      <HeaderComponent leftComponent={<UserAvatar onPress={toUserProfile} uid="logo" />}>Main</HeaderComponent>
      <Text onPress={signOut}>1234</Text>
      <AddPostButtonComponent />
    </MagicMove.Scene>
  );
};

export const MainScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  () => {
    return {};
  },
  {
    signOut: authActions.signOut,
    toUserProfile: () => () => navUtils.navigate(USER_PROFILE_SCREEN),
  },
)(MainScreenComponent);
