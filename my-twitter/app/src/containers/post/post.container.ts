import {connect} from 'react-redux';

import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  PostComponent,
} from '@app/components/post/post.component';
import {IConfiguredStore} from '@app/redux/store';
import {IPost} from '@app/models/post.model';

export interface IOwnProps {
  children: IPost;
}

export interface IOwnHandlers {}

export const Post = connect<IComponentProps, IComponentHandlers, IOwnProps & IOwnHandlers, IConfiguredStore>(
  ({users}, {children}) => {
    const {userInfoMap} = users;
    const {author} = children;
    return {
      authorData: userInfoMap[author] || {},
      children,
    };
  },
  {},
)(PostComponent);
