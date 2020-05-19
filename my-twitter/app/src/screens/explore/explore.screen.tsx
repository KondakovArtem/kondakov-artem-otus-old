import React, {FC} from 'react';
import {connect} from 'react-redux';
import * as MagicMove from 'react-native-magic-move';

import {IConfiguredStore} from 'store';
import {HeaderComponent} from 'components/header/header.component';
import postActions from 'store/post/post.actions';
import {navUtils} from 'services/navigation/navigation.service';
import {FOLLOW_SCREEN, USER_PROFILE_SCREEN} from 'models/navigation.model';
import {PostListComponent} from 'components/post-list/post-list.component';
import {IPost} from 'models/post.model';
import {UserAvatar} from 'containers/user-avatar/user-avatar.container';
import {HeaderActionComponent} from 'components/header-action/header-action.component';

interface IProps {
  followPosts: IPost[];
  followPostRefreshing: boolean;
}
interface IHandlers {
  toUserProfile(): void;
  onFollowPostRefresh(): void;
}

export const ExploreScreenComponent: FC<IProps & IHandlers> = ({
  followPosts,
  toUserProfile,
  onFollowPostRefresh,
  followPostRefreshing,
}) => {
  return (
    <MagicMove.Scene>
      <HeaderComponent
        leftComponent={<UserAvatar onPress={toUserProfile} uid="logo" />}
        rightComponent={
          <HeaderActionComponent name="account-multiple-plus" onPress={() => navUtils.navigate(FOLLOW_SCREEN)} />
        }>
        Explore
      </HeaderComponent>
      <PostListComponent
        isRefreshing={followPostRefreshing}
        onRefresh={onFollowPostRefresh}
        id="exploreList"
        list={followPosts}
      />
    </MagicMove.Scene>
  );
};

export const ExploreScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({post}) => {
    const {followPosts, followPostRefreshing} = post;
    return {
      followPosts,
      followPostRefreshing,
    };
  },
  {
    toUserProfile: () => () => navUtils.navigate(USER_PROFILE_SCREEN),
    onFollowPostRefresh: postActions.fetchFollowPost,
  },
)(ExploreScreenComponent);
