import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  NewPostComponent,
} from 'components/new-post/new-post.component';
import {Actions as postActions} from 'store/post/post.actions';

export interface IOwnProps {
  size?: number;
  color?: string;
  uid?: string;
  containerStyle?: any;
  style?: any;
  showEditButton?: boolean;
  children?: string;
}

export interface IOwnHandlers {
  onPress?(): void;
}

export const NewPostContainer = connect<
  IComponentProps,
  IComponentHandlers,
  IOwnProps & IOwnHandlers,
  IConfiguredStore
>(
  ({post}) => {
    const {newPost} = post;
    return {
      ...newPost,
    };
  },
  {
    onTakePhoto: postActions.takePhoto,
    onRemovePhoto: postActions.removePhoto,
    onPostMessage: postActions.postMessage,
    onChangePostText: postActions.changePostText,
  },
)(NewPostComponent);
