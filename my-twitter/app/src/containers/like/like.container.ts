import {connect} from 'react-redux';
import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  HeartComponent,
} from '@app/components/heart/heart.component';
import {IConfiguredStore} from '@app/redux/store';
import {Actions as postActions} from '@app/redux/post/post.ducks';
import {IPost} from '@app/models/post.model';

export interface IOwnProps {
  children: IPost;
}

export const LikePost = connect<IComponentProps, IComponentHandlers, IOwnProps, IConfiguredStore>(
  ({authData}, {children}) => {
    const {userUid} = authData;
    return {
      userUid,
      children,
    };
  },
  {
    onPress: postActions.togglePostLike,
  },
)(HeartComponent);
