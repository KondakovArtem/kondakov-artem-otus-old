import {createReducer, createAction, Action} from 'typesafe-actions';
import {Dispatch} from 'redux';
import {Actions as guestsActions} from '../guests/guests.ducks';
import {IGuest} from '../../model/guest';

export const ActionTypes = {
  SET_INPUTVALUE: '@header/SET_INPUTVALUE',
};

// STORE
export interface IStore {
  inputValue: string;
}

const initialState: IStore = {
  inputValue: '',
};

// ACTIONS
const setInputValue = createAction(
  ActionTypes.SET_INPUTVALUE,
  (search: string) => search,
)<string>();

export const Actions = {
  setInputValue: (value: string) => (dispatch: Dispatch) => {
    dispatch(setInputValue(value));
  },
  addNewGuest: (name: string) => (dispatch: Dispatch) => {
    if (name !== '') {
      dispatch(setInputValue(''));
      dispatch(guestsActions.addGuest(<IGuest>{name}));
    }
  },
};

// REDUCERS
export const reducer = createReducer<IStore, Action>(initialState).handleAction(
  setInputValue,
  (state, {payload: inputValue}) => {
    return {...state, inputValue};
  },
);
