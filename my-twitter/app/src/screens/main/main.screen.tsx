import React, {FC} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {IConfiguredStore} from '@app/redux/store';

import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {HeaderComponent} from '@app/components/header/header.component';
import {UserAvatar} from '@app/containers/user-avatar/user-avatar.container';
import {navUtils} from '@app/services/navigation/navigation.service';
import {USER_PROFILE_SCREEN} from '@app/models/navigation.model';
import {AddPostButtonComponent} from '@app/components/add-post-button/add-post-button.component';
import {PostListComponent} from '@app/components/post-list/post-list.component';
import {IPost} from '@app/models/post.model';

interface IProps {
  userPosts: IPost[];
  userUid: string;
}
interface IHandlers {
  signOut(): void;
  toUserProfile(): void;
}

export const MainScreenComponent: FC<IProps & IHandlers> = ({toUserProfile, userPosts, userUid}) => (
  <MagicMove.Scene>
    <HeaderComponent
      leftComponent={
        <UserAvatar onPress={toUserProfile} uid="logo">
          {userUid}
        </UserAvatar>
      }>
      Main
    </HeaderComponent>
    <PostListComponent list={userPosts} />
    <AddPostButtonComponent />
  </MagicMove.Scene>
);

export const MainScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({post, authData}) => {
    const {userPosts} = post;
    const {userUid} = authData;
    return {
      userPosts,
      userUid,
    };
  },
  {
    signOut: authActions.signOut,
    toUserProfile: () => () => navUtils.navigate(USER_PROFILE_SCREEN),
  },
)(MainScreenComponent);
