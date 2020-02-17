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
}

export interface IOwnHandlers {}

export const Post = connect<IComponentProps, IComponentHandlers, IOwnProps & IOwnHandlers, IConfiguredStore>(
  ({users, post}, {children}) => {
    const {userInfoMap} = users;
    const {author} = children;
    const {postToDelete} = post;
    return {
      deleting: postToDelete.includes(children.id),
      authorData: userInfoMap[author] || {},
      children,
    };
  },
  {
    onLongPress: postActions.deletePostConfirm,
  },
)(PostComponent);
