import React, {FC} from 'react';
import {connect} from 'react-redux';
import * as MagicMove from 'react-native-magic-move';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {HeaderComponent} from 'components/header/header.component';
import {navUtils} from 'services/navigation/navigation.service';
import {USER_PROFILE_SCREEN} from 'models/navigation.model';
import {PostListComponent} from 'components/post-list/post-list.component';
import {IPost} from 'models/post.model';
import {UserAvatar} from 'containers/user-avatar/user-avatar.container';
import {commonStyles} from 'constants/theme';

interface IProps {
  userPosts: IPost[];
}
interface IHandlers {
  signOut(): void;
  toUserProfile(): void;
}

export const MainScreenComponent: FC<IProps & IHandlers> = ({toUserProfile, userPosts}) => (
  <MagicMove.Scene>
    <HeaderComponent
      leftContainerStyle={commonStyles.headerLogoContainer}
      leftComponent={<UserAvatar onPress={toUserProfile} uid="logo" />}>
      Main
    </HeaderComponent>
    <PostListComponent list={userPosts} emptyText={'Post something'} />
  </MagicMove.Scene>
);

export const MainScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({post}) => {
    const {userPosts} = post;
    return {
      userPosts,
    };
  },
  {
    signOut: authActions.signOut,
    toUserProfile: () => () => navUtils.navigate(USER_PROFILE_SCREEN),
  },
)(MainScreenComponent);
