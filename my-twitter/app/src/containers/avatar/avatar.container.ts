import {connect} from 'react-redux';

import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  AvatarComponent,
} from 'components/avatar/avatar.component';
import {IConfiguredStore} from 'store';

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

export const AvatarContainer = connect<IComponentProps, IComponentHandlers, IOwnProps & IOwnHandlers, IConfiguredStore>(
  ({users}, props) => {
    const {userInfoMap} = users;
    const {children} = props;
    let initial, avatar;
    if (children) {
      const userInfo = userInfoMap[children] || {};
      avatar = userInfo.avatar;
      initial = (userInfo.name || userInfo.email || '?')[0].toUpperCase();
    }
    return {
      imageUri: avatar,
      label: initial,
      ...props,
    };
  },
  (state, {onPress}) => {
    return {
      onPress,
    };
  },
)(AvatarComponent);
