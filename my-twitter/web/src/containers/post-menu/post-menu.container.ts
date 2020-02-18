import {CSSProperties} from 'react';
import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import {IPost} from 'models/post.model';
import {Actions as postActions} from 'store/post/post.actions';
import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  PostMenuComponent,
} from 'components/post-menu/post-menu.component';

export interface IOwnProps {
  children: IPost;
  style?: CSSProperties;
}

export const PostMenu = connect<IComponentProps, IComponentHandlers, IOwnProps, IConfiguredStore>(
  (state, {children, style}) => {
    return {
      children,
      menu: [{title: 'Delete', key: 'delete'}],
      style,
    };
  },
  (dispatch, {children}) => {
    return {
      action: (key: string) => {
        if (key === 'delete') {
          postActions.deletePostAction({
            dialog: {
              data: children,
            },
            key,
          })(dispatch);
        }
      },
    };
  },
)(PostMenuComponent);
