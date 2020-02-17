import {connect} from 'react-redux';

import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  AvatarDialogComponent,
} from 'components/avatar-dialog/avatar-dialog.component';
import {IConfiguredStore} from 'store';
import {Actions as editUserInfoActions} from 'store/edit-user-info/edit-user-info.actions';
import {IUserInfo} from 'models/user.model';

export interface IOwnHandlers {
  onPress?(): void;
}

export const AvatarDialogContainer = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  ({editUserInfo, authData}) => {
    const {showAvatarEditor} = editUserInfo;
    const {info = {} as IUserInfo} = authData;
    const {avatar} = info;
    return {
      visible: showAvatarEditor,
      src: avatar,
    };
  },
  {
    onCancel: editUserInfoActions.hideAvatarEditor,
    onApply: editUserInfoActions.saveAvatar,
  },
)(AvatarDialogComponent);
