import {uniqueId} from 'lodash-es';

import {IModalDialog, IDialogButtonAction, DialogAction} from 'models/dialog.model';
import {ThunkAction} from 'store';
import {Actions as postActions} from 'store/post/post.actions';
import {addDialog, removeDialog} from 'store/dialog/dialog.ducks';

export const Actions = {
  addDialog: (dialog: IModalDialog): ThunkAction => async dispatch => {
    dispatch(
      addDialog({
        uid: uniqueId(),
        ...dialog,
      }),
    );
  },
  removeDialog: (dialog: IModalDialog): ThunkAction => async dispatch => {
    dispatch(removeDialog(dialog));
  },
  processButtonAction: (buttonAction: IDialogButtonAction): ThunkAction => async (dispatch, getStore) => {
    const {dialog} = buttonAction;
    const {action} = dialog;
    if (action === DialogAction.DELETE_POST) {
      await postActions.deletePostAction(buttonAction)(dispatch);
      Actions.removeDialog(dialog)(dispatch, getStore);
    }
  },
};
