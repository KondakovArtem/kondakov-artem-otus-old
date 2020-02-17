import React, { FC } from 'react';
import {connect} from 'react-redux';

import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  PostComponent,
} from 'components/post/post.component';
import {IConfiguredStore} from 'store';
import {IPost} from 'models/post.model';
import {Actions as postActions} from 'store/post/post.actions';

export interface IOwnProps {
  children: IPost;
  ref?: any;
}

export const Post = connect<IComponentProps, IComponentHandlers, IOwnProps, IConfiguredStore>(
  ({users, post}, {children, ref}) => {
    const {userInfoMap} = users;
    const {author} = children;
    const {postToDelete} = post;
    return {
      deleting: postToDelete.includes(children.id),
      authorData: userInfoMap[author] || {},
      children,
      ref,
    };
  },
  {
    onLongPress: postActions.deletePostConfirm,
  },
)(PostComponent);
