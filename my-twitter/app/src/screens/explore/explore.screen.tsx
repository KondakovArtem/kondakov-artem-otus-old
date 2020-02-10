import React, {FC} from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {HeaderComponent} from '@app/components/header/header.component';
import {statusBackground} from '@app/constants/theme';
import {navUtils} from '@app/services/navigation/navigation.service';
import {FOLLOW_SCREEN, USER_PROFILE_SCREEN} from '@app/models/navigation.model';
import {PostListComponent} from '@app/components/post-list/post-list.component';
import {IPost} from '@app/models/post.model';
import {AddPostButtonComponent} from '@app/components/add-post-button/add-post-button.component';
import {UserAvatar} from '@app/containers/user-avatar/user-avatar.container';

interface IProps {
  followPosts: IPost[];
}
interface IHandlers {
  toUserProfile: () => void;
}

const styles = StyleSheet.create({
  defContainer: {flex: 0},
  expandContainer: {flexGrow: 1, justifyContent: 'flex-end', flexDirection: 'row'},

  headerIconContainer: {left: -8},
  headerIcon: {fontSize: 20},
});

export const ExploreScreenComponent: FC<IProps & IHandlers> = ({followPosts, toUserProfile}) => {
  return (
    <MagicMove.Scene>
      <HeaderComponent
        leftContainerStyle={styles.defContainer}
        centerContainerStyle={styles.defContainer}
        rightContainerStyle={styles.expandContainer}
        leftComponent={
          <UserAvatar
            onPress={() => {
              debugger;
              toUserProfile();
            }}
            uid="logo"
          />
        }
        rightComponent={
          <Icon
            type="material-community"
            name="account"
            color={statusBackground}
            selectionColor={'white'}
            containerStyle={styles.headerIconContainer}
            iconStyle={styles.headerIcon}
            suppressHighlighting={true}
            size={16}
            reverse
            onPress={() => navUtils.navigate(FOLLOW_SCREEN)}
          />
        }
      />
      <PostListComponent list={followPosts} />
      <AddPostButtonComponent />
    </MagicMove.Scene>
  );
};

export const ExploreScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({post}) => {
    const {followPosts} = post;
    return {
      followPosts,
    };
  },
  {
    toUserProfile: () => () => navUtils.navigate(USER_PROFILE_SCREEN),
  },
)(ExploreScreenComponent);
