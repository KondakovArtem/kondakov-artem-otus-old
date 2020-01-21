import {createReducer, createAction, Action} from 'typesafe-actions';
import {Dispatch} from 'redux';

import {Actions as guestsActions} from '@app/redux/guests/guests.ducks';
import {IGuest} from '@app/model/guest.model';
import {GetStore} from '@app/redux/store';
import {ActionTypes as commonActionsTypes} from '@app/redux/common/common.ducks';

export const ActionTypes = {
  SET_INPUTVALUE: '@header/SET_INPUTVALUE',
};

/////////////////////////////////////////////
// STORE
/////////////////////////////////////////////
export interface IStore {
  inputValue: string;
}

const initialState: IStore = {
  inputValue: '',
};

/////////////////////////////////////////////
// ACTIONS
/////////////////////////////////////////////
const setInputValue = createAction(ActionTypes.SET_INPUTVALUE, (search: string) => search)<string>();
const signOutClear = createAction(commonActionsTypes.SIGN_OUT_CLEAR, () => {})();

export const Actions = {
  setInputValue: (value: string) => (dispatch: Dispatch) => {
    dispatch(setInputValue(value));
  },
  addNewGuest: (name: string) => (dispatch: Dispatch, getStore: GetStore) => {
    if (name !== '') {
      dispatch(setInputValue(''));
      guestsActions.addGuest({name} as IGuest)(dispatch, getStore);
    }
  },
};

/////////////////////////////////////////////
// REDUCERS
/////////////////////////////////////////////
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(setInputValue, (state, {payload: inputValue}) => ({...state, inputValue}))
  .handleAction(signOutClear, state => ({
    ...state,
    ...initialState,
  }));
