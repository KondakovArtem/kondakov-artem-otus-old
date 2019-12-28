import {createReducer, createAction, Action} from 'typesafe-actions';
import {Dispatch} from 'redux';

import {Actions as guestsActions} from '../guests/guests.ducks';
import {IGuest} from '../../model/guest.model';
import {GetStore} from '../store';
import {ActionTypes as commonActionsTypes} from '../common/common.ducks';

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
