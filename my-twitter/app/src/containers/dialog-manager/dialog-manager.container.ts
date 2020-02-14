import {connect} from 'react-redux';
import {first} from 'lodash-es';

import {IProps as IComponentProps, DialogManagerComponent} from 'components/dialog-manager/dialog-manager.component';
import {IConfiguredStore} from 'store';
import {Actions as dialogActions} from 'store/dialog/dialog.ducks';

export const DialogManager = connect<IComponentProps, {}, {}, IConfiguredStore>(
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
