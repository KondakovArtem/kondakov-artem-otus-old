import {uniqueId} from 'lodash-es';
import {createAction, createReducer, Action} from 'typesafe-actions';

import {SIGN_OUT_CLEAR} from 'store/auth/auth.actions';
import {IModalDialog, IDialogButtonAction, DialogAction} from 'models/dialog.model';
import {ThunkAction} from 'store';
import {Actions as postActions} from 'store/post/post.ducks';

export const ADD_DIALOG = '@dialog/ADD';
export const REMOVE_DIALOG = '@dialog/REMOVE';

///////////////////////////////////////
// STORE
///////////////////////////////////////
export interface IStore {
  dialogs: IModalDialog[];
}

const initialState: IStore = {
  dialogs: [],
};

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
const signOutClear = createAction(SIGN_OUT_CLEAR, () => {})();
const addDialog = createAction(ADD_DIALOG, (dialog: IModalDialog) => dialog)();
const removeDialog = createAction(REMOVE_DIALOG, (dialog: IModalDialog) => dialog)();

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
      await postActions.deletePostAction(buttonAction)(dispatch, getStore);
      Actions.removeDialog(dialog)(dispatch, getStore);
    }
  },
};

/////////////////////////////////////////////
/// REDUCERS
/////////////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(signOutClear, () => ({
    ...initialState,
  }))
  .handleAction(addDialog, (state, {payload}) => ({
    ...state,
    dialogs: [payload, ...state.dialogs],
  }))
  .handleAction(removeDialog, (state, {payload}) => ({
    ...state,
    dialogs: state.dialogs.filter(dialog => dialog.uid !== payload.uid),
  }));
