import React, {FC, CSSProperties, memo} from 'react';
import {isEmpty, isEqual} from 'lodash-es';
import {List, Icon} from 'antd';

import {IPost} from 'models/post.model';
import {getDateAgo} from 'services/core/core.service';
import {LikePost} from 'containers/like/like.container';
import {IUserInfo} from 'models/user.model';
import {DELETE_POST_DURATION} from 'constants/theme';
import {AvatarContainer} from 'containers/avatar/avatar.container';

const styles: {
  [key: string]: CSSProperties;
} = {
  container: {padding: 10, alignItems: 'flex-start'},
  title: {padding: 0, margin: 0},
  titleView: {flexDirection: 'row', display: 'flex'},
  titleText: {flexGrow: 1, flexShrink: 1},
  name: {fontSize: 15, fontWeight: 'bold'},
  email: {color: 'grey'},
  imageView: {borderRadius: 10, marginTop: 6, display: 'flex', overflow: 'hidden'},
  image: {width: '100%', borderRadius: 10},
  actionView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
  },
  comment: {flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'},
  retweet: {flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'},
};

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
      <div style={styles.titleView}>
        <span style={styles.titleText}>
          {!isEmpty(name) && <span style={styles.name}>{name} </span>}
          {!isEmpty(email) && <span style={styles.email}>{email}</span>}
        </span>
        <span> {getDateAgo(createdAt)}</span>
      </div>
      <div>
        {!isEmpty(text) && <span>{text}</span>}
        {!isEmpty(image) && (
          <div style={styles.imageView}>
            <img src={image} style={{width: '100%'}}></img>
          </div>
        )}
      </div>
      <div style={styles.actionView}>
        <div style={styles.comment}>
          <Icon type="message" />
        </div>
        <div style={styles.retweet}>
          <Icon type="retweet" />
        </div>
        {/* <LikePost>{children}</LikePost> */}
      </div>
    </>
  );
};

export const PostElement: FC<IProps & IHandlers> = ({children, authorData, onLongPress, deleting}) => {
  const {author, id} = children;

  const longPress = () => onLongPress && onLongPress(children);

  const animationProps = deleting
    ? {
        animation: 'fadeOutLeft',
        duration: DELETE_POST_DURATION,
        useNativeDriver: true,
      }
    : {};

  return (
    <List.Item key={id}>
      <div style={{overflowX: 'hidden', display: 'flex', flexDirection: 'row', margin: '0 -5px', width: '100%'}}>
        <div style={{margin: '0 5px'}}>
          <AvatarContainer size={50}>{author}</AvatarContainer>
        </div>
        <div style={{margin: '0 5px', flex: 1}}>
          <PostContent author={authorData}>{children}</PostContent>
        </div>
      </div>
    </List.Item>
  );
};

export const PostComponent = memo(PostElement);

// export const PostComponent = memo<IProps & IHandlers>(PostElement, (prevProps, nextProps) => {
//   const {children: prePost, authorData: preAuthor, deleting: preDeleting} = prevProps;
//   const {children: nextPost, authorData: nextAuthor, deleting: nextDeleting} = nextProps;
//   debugger;
//   return isEqual(prePost, nextPost) && isEqual(preAuthor, nextAuthor) && preDeleting === nextDeleting;
// });
