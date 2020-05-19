import {connect} from 'react-redux';

import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  HeartComponent,
} from 'components/heart/heart.component';
import {IConfiguredStore} from 'store';
import {Actions as postActions} from 'store/post/post.actions';
import {IPost} from 'models/post.model';

export interface IOwnProps {
  children: IPost;
}

export const LikePost = connect<IComponentProps, IComponentHandlers, IOwnProps, IConfiguredStore>(
  ({authData}, {children}) => {
    const {userUid} = authData;
    const {likes} = children;
    return {
      userUid,
      children: likes,
    };
  },
  (dispatch, {children}) => ({
    onPress: () => postActions.togglePostLike(children)(),
  }),
)(HeartComponent);
