import React, {FC} from 'react';
import {isEmpty} from 'lodash-es';
import {List, Icon} from 'antd';
import {StyleSheet, Text, View} from 'react-native';
import {motion} from 'framer-motion';
import styled from 'styled-components';

import {IPost} from 'models/post.model';
import {getDateAgo} from 'services/core/core.service';
import {LikePost} from 'containers/like/like.container';
import {IUserInfo} from 'models/user.model';
import {deletePostVariant} from 'constants/theme';
import {AvatarContainer} from 'containers/avatar/avatar.container';
import {PostMenu} from 'containers/post-menu/post-menu.container';
import {navUtils} from 'services/navigation';
import {NavPath} from 'models/navigation.model';

const styles = StyleSheet.create({
  container: {padding: 10, alignItems: 'flex-start'},
  title: {padding: 0, margin: 0},
  titleView: {flexDirection: 'row', display: 'flex', alignItems: 'center'},
  titleText: {flexGrow: 1, flexShrink: 1},
  name: {fontSize: 15, fontWeight: 'bold'},
  email: {color: 'grey'},
  imageView: {borderRadius: 10, marginTop: 6, display: 'flex', overflow: 'hidden'},
  image: {width: '100%', borderRadius: 10},
  avatarContainer: {marginHorizontal: 6},
  contentContainer: {marginHorizontal: 6, flex: 1},
  listContainer: {width: '100%', flexDirection: 'row'},
  actionView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
  },
  comment: {flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'},
  retweet: {flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'},
});

export const PostImage = styled.img`
  width: 100%;
  max-height: 270px;
  object-fit: cover;
`;

export interface IProps {
  deleting: boolean;
  children: IPost;
  authorData: IUserInfo;
  currentUserId: string;
}

export interface IHandlers {
  onLongPress?(post: IPost): void;
}

interface IContentProps {
  author: IUserInfo;
  children: IPost;
  currentUserId: string;
}

const PostContent: FC<IContentProps> = ({children, author, currentUserId}) => {
  const {createdAt, text, image} = children;
  const {name, email, id: userId} = author;

  return (
    <>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {!isEmpty(name) && <Text style={styles.name}>{name} </Text>}
          {!isEmpty(email) && <Text style={styles.email}>{email}</Text>}
        </Text>
        <Text> {getDateAgo(createdAt)}</Text>
        {userId === currentUserId && <PostMenu style={{paddingLeft: '10px'}}>{children}</PostMenu>}
      </View>
      <View>
        {!isEmpty(text) && <Text>{text}</Text>}
        {!isEmpty(image) && (
          <View style={styles.imageView}>
            <PostImage alt="" src={image} />
          </View>
        )}
      </View>
      <View style={styles.actionView}>
        <View style={styles.comment}>
          <Icon type="message" />
        </View>
        <View style={styles.retweet}>
          <Icon type="retweet" />
        </View>
        <LikePost>{children}</LikePost>
      </View>
    </>
  );
};

export const PostComponent: FC<IProps & IHandlers> = ({children, authorData, deleting, currentUserId}) => {
  const {author, id} = children;

  const animationProps = deleting ? deletePostVariant : {};
  const showUserProfile = () => {
    navUtils.navigate(NavPath.USERINFO({uid: author}));
  };

  return (
    <motion.div {...animationProps} key={id}>
      <List.Item>
        <View style={styles.listContainer}>
          <View style={styles.avatarContainer}>
            <AvatarContainer onPress={showUserProfile} size={50}>
              {author}
            </AvatarContainer>
          </View>
          <View style={styles.contentContainer}>
            <PostContent author={authorData} currentUserId={currentUserId}>
              {children}
            </PostContent>
          </View>
        </View>
      </List.Item>
    </motion.div>
  );
};
