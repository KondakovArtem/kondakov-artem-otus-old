import {connect} from 'react-redux';

import {IProps as IComponentProps, IHandlers as IComponentHandlers} from 'components/avatar/avatar.component';
import {IConfiguredStore} from 'store';
import {IOwnProps, IOwnHandlers, AvatarContainer} from 'containers/avatar/avatar.container';

export const UserAvatar = connect<IComponentProps, IComponentHandlers, IOwnProps & IOwnHandlers, IConfiguredStore>(
  ({authData}, props) => {
    const {userUid} = authData;
    return {
      ...props,
      children: userUid,
    };
  },
  (state, props) => {
    const {onPress} = props;
    return {
      onPress,
    };
  },
)(AvatarContainer);
