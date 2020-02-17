import {connect} from 'react-redux';
import {first} from 'lodash-es';

import {
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  DialogManagerComponent,
} from 'components/dialog-manager/dialog-manager.component';
import {IConfiguredStore} from 'store';
import {Actions as dialogActions} from 'store/dialog/dialog.actions';

export const DialogManager = connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
  ({dialog}) => {
    const {dialogs = []} = dialog;
    return {
      children: first(dialogs),
    };
  },
  {
    onClose: dialogActions.removeDialog,
    onPressButton: dialogActions.processButtonAction,
  },
)(DialogManagerComponent);
