import React, {FC, memo} from 'react';
import {isEmpty} from 'lodash-es';
import {List, Icon} from 'antd';
import {StyleSheet, Text, View} from 'react-native';

import {IPost} from 'models/post.model';
import {getDateAgo} from 'services/core/core.service';
import {LikePost} from 'containers/like/like.container';
import {IUserInfo} from 'models/user.model';
import {DELETE_POST_DURATION} from 'constants/theme';
import {AvatarContainer} from 'containers/avatar/avatar.container';

const styles = StyleSheet.create({
  container: {padding: 10, alignItems: 'flex-start'},
  title: {padding: 0, margin: 0},
  titleView: {flexDirection: 'row', display: 'flex'},
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

export interface IProps {
  deleting: boolean;
  children: IPost;
  authorData: IUserInfo;
}

export interface IHandlers {
  onLongPress?(post: IPost): void;
}

interface IContentProps {
  author: IUserInfo;
  children: IPost;
}

const PostContent: FC<IContentProps> = ({children, author}) => {
  const {createdAt, text, image} = children;
  const {name, email} = author;

  return (
    <>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {!isEmpty(name) && <Text style={styles.name}>{name} </Text>}
          {!isEmpty(email) && <Text style={styles.email}>{email}</Text>}
        </Text>
        <Text> {getDateAgo(createdAt)}</Text>
      </View>
      <View>
        {!isEmpty(text) && <Text>{text}</Text>}
        {!isEmpty(image) && (
          <View style={styles.imageView}>
            <img
              src={image}
              style={{
                width: '100%',
                maxHeight: '270px',
                objectFit: 'cover',
              }}></img>
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

export const PostElement: FC<IProps & IHandlers> = ({children, authorData, deleting}) => {
  const {author, id} = children;

  const animationProps = deleting
    ? {
        animation: 'fadeOutLeft',
        duration: DELETE_POST_DURATION,
        useNativeDriver: true,
      }
    : {};

  return (
    <List.Item key={id}>
      <View style={styles.listContainer}>
        <View style={styles.avatarContainer}>
          <AvatarContainer size={50}>{author}</AvatarContainer>
        </View>
        <View style={styles.contentContainer}>
          <PostContent author={authorData}>{children}</PostContent>
        </View>
      </View>
    </List.Item>
  );
};

export const PostComponent = PostElement;
