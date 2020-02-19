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

export const UserInfoScreen = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  ({users, authData}) => {
    const {userUid: curUserUid} = authData;
    const {selectedUser, userInfoMap} = users;
    const {userUid, postUid} = selectedUser;
    const info = (userInfoMap[userUid] || {}) as IUserInfo;
    return {
      ...info,
      canEdit: curUserUid === userUid,
      userUid,
      avatarUid: postUid,
    };
  },
  {
    signOut: authActions.signOut,
    takeAvatar: authActions.takeAvatar,
    onEditUserProfile: editUserInfoActions.editUserProfile,
    init: editUserInfoActions.getFollowers,
  },
)(UserProfileComponent);
