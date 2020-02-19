import React, {FC} from 'react';
import * as Animatable from 'react-native-animatable';
import {ListItem, Icon} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {isEmpty} from 'lodash-es';

import {IPost} from 'models/post.model';
import {AvatarContainer} from 'containers/avatar/avatar.container';
import {getDateAgo} from 'services/core/core.service';
import {LikePost} from 'containers/like/like.container';
import {IUserInfo} from 'models/user.model';
import {DELETE_POST_DURATION} from 'constants/theme';

const styles = StyleSheet.create({
  container: {padding: 10, alignItems: 'flex-start'},
  title: {padding: 0, margin: 0},
  titleView: {flexDirection: 'row'},
  titleText: {flexGrow: 1, flexShrink: 1},
  name: {fontSize: 15, fontWeight: 'bold'},
  email: {color: 'grey'},
  imageView: {borderRadius: 10, paddingTop: 6},
  image: {width: '100%', aspectRatio: 1, borderRadius: 10},
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
  },
  comment: {flex: 1, top: -2},
  retweet: {flex: 1},
});

export interface IProps {
  deleting: boolean;
  children: IPost;
  authorData: IUserInfo;
  listId: string;
}

export interface IHandlers {
  onLongPress?(post: IPost): void;
  onClickAvatar?(post: IPost, callUid: string): void;
}

interface IContentProps {
  author: IUserInfo;
  children: IPost;
}

const PostContent: FC<IContentProps> = ({children, author}) => {
  const {createdAt, text, image, id} = children;
  const {name, email} = author;

  return (
    <>
      <View style={styles.titleView}>
        <Text numberOfLines={1} style={styles.titleText}>
          {!isEmpty(name) && <Text style={styles.name}>{name} </Text>}
          {!isEmpty(email) && <Text style={styles.email}>{email}</Text>}
        </Text>
        <Text numberOfLines={1}> {getDateAgo(createdAt)}</Text>
      </View>
      <View>
        {!isEmpty(text) && <Text>{text}</Text>}
        {!isEmpty(image) && (
          <View style={styles.imageView}>
            <FastImage
              style={styles.image}
              source={{
                uri: image,
                priority: FastImage.priority.normal,
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.actionView}>
        <View style={styles.comment}>
          <Icon type="font-awesome" color="grey" size={18} name="comment-o" />
        </View>
        <View style={styles.retweet}>
          <Icon type="material-community" color="grey" name="twitter-retweet" />
        </View>
        <LikePost key={`heart_${id}`}>{children}</LikePost>
      </View>
    </>
  );
};

export const PostComponent: FC<IProps & IHandlers> = ({
  children,
  authorData,
  onLongPress,
  deleting,
  onClickAvatar,
  listId,
}) => {
  const {author, id} = children;

  const longPress = () => onLongPress && onLongPress(children);

  const animationProps = deleting
    ? {
        animation: 'fadeOutLeft',
        duration: DELETE_POST_DURATION,
        useNativeDriver: true,
      }
    : {};

  const clickAvatar = () => onClickAvatar && onClickAvatar(children, `${listId}_${id}_${author}`);

  return (
    <Animatable.View {...animationProps}>
      <ListItem
        onLongPress={longPress}
        containerStyle={styles.container}
        titleStyle={styles.title}
        leftAvatar={
          <AvatarContainer uid={`${listId}_${id}_${author}`} onPress={clickAvatar}>
            {author}
          </AvatarContainer>
        }
        title={<PostContent author={authorData}>{children}</PostContent>}
        bottomDivider
      />
    </Animatable.View>
  );
};
