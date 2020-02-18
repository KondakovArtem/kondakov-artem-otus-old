import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {Actions as editUserInfoActions} from 'store/edit-user-info/edit-user-info.actions';
import {IUserInfo} from 'models/user.model';
import {
  UserProfilePageComponent,
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
} from 'components/user-profile-page/user-profile-page.component';

export const UserProfilePage = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  ({authData, users}) => {
    const {info = {}, userUid} = authData;
    const {follows = [], followers = []} = users;

    return {
      ...(info as IUserInfo),
      userUid,
      canEdit: true,
      followsCount: follows.length,
      followersCount: followers.length,
    };
  },
  {
    signOut: authActions.signOut,
    takeAvatar: editUserInfoActions.showAvatarEditor,
    onEditUserProfile: editUserInfoActions.editUserProfile,
    init: editUserInfoActions.getFollowers,
  },
)(UserProfilePageComponent);
