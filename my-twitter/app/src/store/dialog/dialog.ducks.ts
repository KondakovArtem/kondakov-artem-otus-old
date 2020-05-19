import {createAction, createReducer, Action} from 'typesafe-actions';

import {IModalDialog} from 'models/dialog.model';
import {SIGN_OUT_CLEAR} from 'store/auth/auth.ducks';

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
export const signOutClear = createAction(SIGN_OUT_CLEAR)();
export const addDialog = createAction(ADD_DIALOG, (dialog: IModalDialog) => dialog)();
export const removeDialog = createAction(REMOVE_DIALOG, (dialog: IModalDialog) => dialog)();

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
