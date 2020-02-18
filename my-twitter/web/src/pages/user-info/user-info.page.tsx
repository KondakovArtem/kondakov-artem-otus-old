import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {Actions as editUserInfoActions} from 'store/edit-user-info/edit-user-info.actions';
import {IUserInfo} from 'models/user.model';
import {
  UserProfilePageComponent,
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
} from 'components/user-profile-page/user-profile-page.component';

export const UserInfoPage = withRouter(
  connect<IComponentProps, IComponentHandlers, RouteComponentProps, IConfiguredStore>(
    ({authData, users}, {match}) => {
      const {params} = match;
      const {id: userUid} = params as any;
      const {userUid: currentUserId} = authData;

      const {userInfoMap} = users;
      const info = (userInfoMap[userUid] || {}) as IUserInfo;
      const {id: userId} = info;

      return {
        location: null,
        ...info,
        userUid,
        canEdit: userId === currentUserId,
      };
    },
    {
      signOut: authActions.signOut,
      takeAvatar: editUserInfoActions.showAvatarEditor,
      onEditUserProfile: editUserInfoActions.editUserProfile,
      init: editUserInfoActions.getFollowers,
    },
  )(UserProfilePageComponent),
);
