import {connect} from 'react-redux';

import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  FollowButtonComponent,
} from 'components/follow-button/follow-button.component';
import {IConfiguredStore} from 'store';
import {headerBackground} from 'constants/theme';
import {Actions as usersActions} from 'store/users/users.ducks';

export interface IOwnProps {
  children: string;
}

export const FollowButton = connect<IComponentProps, IComponentHandlers, IOwnProps, IConfiguredStore>(
  ({users}, {children}) => {
    const {follows = []} = users;
    const isFollow = follows.includes(children);

    return {
      title: isFollow ? 'Unfollow' : 'Follow',
      type: isFollow ? 'solid' : 'outline',
      color: isFollow ? 'white' : headerBackground,
      borderColor: headerBackground,
      backgroundColor: isFollow ? headerBackground : undefined,
    };
  },
  (dispatch, {children}) => {
    return {
      onPress: () => {
        usersActions.toggleFollow(children)();
      },
    };
  },
)(FollowButtonComponent);
