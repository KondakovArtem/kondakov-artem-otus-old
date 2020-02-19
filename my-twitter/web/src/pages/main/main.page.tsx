import React, {FC} from 'react';
import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {HeaderComponent} from 'components/header/header.component';
import {navUtils} from 'services/navigation';
import {USER_PROFILE_SCREEN} from 'models/navigation.model';
import {PostListComponent} from 'components/post-list/post-list.component';
import {IPost} from 'models/post.model';
import {thumbnailVariants} from 'constants/theme';
import {NewPostContainer} from 'containers/new-post/new-post.container';
import {MotionWrapperComponent} from 'components/motion-wrapper/motion-wrapper.component';

interface IProps {
  userPosts: IPost[];
}
interface IHandlers {
  signOut(): void;
  toUserProfile(): void;
}

export const MainPageComponent: FC<IProps & IHandlers> = ({userPosts}) => (
  <MotionWrapperComponent {...thumbnailVariants}>
    <HeaderComponent>Main</HeaderComponent>
    <NewPostContainer />
    <PostListComponent style={{flex: 1}} list={userPosts} emptyText={'Post something'} />
  </MotionWrapperComponent>
);

export const MainPage = connect<IProps, IHandlers, {}, IConfiguredStore>(
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
)(MainPageComponent);
