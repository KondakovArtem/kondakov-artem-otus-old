import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {Actions as editUserInfoActions} from 'store/edit-user-info/edit-user-info.actions';
import {IUserInfo} from 'models/user.model';
import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  UserProfileComponent,
} from 'components/user-profile/user-profile.component';

export const UserProfileScreen = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  ({authData, users}) => {
    const {info = {}, userUid} = authData;
    const {follows = [], followers = []} = users;
    return {
      ...(info as IUserInfo),
      userUid,
      followsCount: follows.length,
      followersCount: followers.length,
      canEdit: true,
    };
  },
  {
    signOut: authActions.signOut,
    takeAvatar: authActions.takeAvatar,
    onEditUserProfile: editUserInfoActions.editUserProfile,
    init: editUserInfoActions.getFollowers,
  },
)(UserProfileComponent);
