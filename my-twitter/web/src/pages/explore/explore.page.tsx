import React, {FC} from 'react';
import {connect} from 'react-redux';
import {motion} from 'framer-motion';

import {IConfiguredStore} from 'store';
import {HeaderComponent} from 'components/header/header.component';
import {USER_PROFILE_SCREEN} from 'models/navigation.model';
import {PostListComponent} from 'components/post-list/post-list.component';
import {IPost} from 'models/post.model';
import {navUtils} from 'services/navigation';
import {thumbnailVariants} from 'constants/theme';
import {NewPostContainer} from 'containers/new-post/new-post.container';

interface IProps {
  followPosts: IPost[];
}
interface IHandlers {
  toUserProfile: () => void;
}

export const ExplorePageComponent: FC<IProps & IHandlers> = ({followPosts, toUserProfile}) => {
  return (
    <motion.div {...thumbnailVariants} style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
      <HeaderComponent
      // leftContainerStyle={commonStyles.headerLogoContainer}
      //rightComponent={
      // <HeaderActionComponent name="account-multiple-plus" onPress={() => navUtils.navigate(FOLLOW_SCREEN)} />
      //}
      >
        Explore
      </HeaderComponent>
      <NewPostContainer />
      <PostListComponent list={followPosts} />
    </motion.div>
  );
};

export const ExplorePage = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({post}) => {
    const {followPosts} = post;
    return {
      followPosts,
    };
  },
  {
    toUserProfile: () => () => navUtils.navigate(USER_PROFILE_SCREEN),
  },
)(ExplorePageComponent);
