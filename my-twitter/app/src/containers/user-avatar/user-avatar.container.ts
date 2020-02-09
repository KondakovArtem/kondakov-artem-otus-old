import {connect} from 'react-redux';
import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  AvatarComponent,
} from '@app/components/avatar/avatar.component';
import {IConfiguredStore} from '@app/redux/store';

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

export const UserAvatar = connect<IComponentProps, IComponentHandlers, IOwnProps & IOwnHandlers, IConfiguredStore>(
  (state, props) => {
    const {users} = state;
    const {userInfoMap} = users;
    const {size, color, uid, containerStyle, style, showEditButton, children} = props;
    let initial, avatar;
    if (children) {
      const userInfo = userInfoMap[children] || {};
      avatar = userInfo.avatar;
      initial = (userInfo.name || userInfo.email || '?')[0].toUpperCase();
    }
    // {initial, avatar} = info;

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
