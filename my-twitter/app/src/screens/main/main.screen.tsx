import React, {FC} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {HeaderComponent} from '@app/components/header/header.component';
import {navUtils} from '@app/services/navigation/navigation.service';
import {USER_PROFILE_SCREEN} from '@app/models/navigation.model';
import {AddPostButtonComponent} from '@app/components/add-post-button/add-post-button.component';
import {PostListComponent} from '@app/components/post-list/post-list.component';
import {IPost} from '@app/models/post.model';
import {UserAvatar} from '@app/containers/user-avatar/user-avatar.container';

interface IProps {
  userPosts: IPost[];
}
interface IHandlers {
  signOut(): void;
  toUserProfile(): void;
}

export const MainScreenComponent: FC<IProps & IHandlers> = ({toUserProfile, userPosts}) => (
  <MagicMove.Scene>
    <HeaderComponent leftComponent={<UserAvatar onPress={toUserProfile} uid="logo" />}>Main</HeaderComponent>
    <PostListComponent list={userPosts} emptyText={'Post something'} />
    <AddPostButtonComponent />
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
