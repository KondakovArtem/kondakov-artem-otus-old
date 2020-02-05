import {connect} from 'react-redux';
import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  AvatarComponent,
} from '@app/components/avatar/avatar.component';
import {IConfiguredStore} from '@app/redux/store';
import {IUserInfo} from '@app/models/user.model';

export interface IOwnProps {
  size?: number;
  color?: string;
  uid?: string;
  containerStyle?: any;
  style?: any;
  showEditButton?: boolean;
}

export interface IOwnHandlers {
  onPress?(): void;
}

export const UserAvatar = connect<IComponentProps, IComponentHandlers, IOwnProps & IOwnHandlers, IConfiguredStore>(
  (state, props) => {
    const {authData} = state;
    const {info = {} as IUserInfo} = authData;
    const {size = 34, color, uid, containerStyle, style, showEditButton} = props;
    const {initial, avatar} = info;
    return {
      imageUri: avatar,
      label: initial,
      size,
      color,
      uid,
      style,
      containerStyle,
      showEditButton,
    };
  },
  (state, props) => {
    const {onPress} = props;
    return {
      onPress,
    };
  },
)(AvatarComponent);
