//import { createActions, handleActions } from 'redux-actions';
import { createReducer, createAction, Action } from 'typesafe-actions';
// import { debounce } from 'lodash-es';
import { Dispatch } from 'redux';
import {Actions as guestsActions} from '../guests/guests.ducks'
import { IGuest } from 'src/model/guest';

export const ActionTypes = {
    SET_INPUTVALUE: '@header/SET_INPUTVALUE'
};


export interface IStore {
    inputValue: string;
}

const initialState: IStore = {
    inputValue: '',
};

const setInputValue = createAction(ActionTypes.SET_INPUTVALUE, (search: string) => search)<string>();

export const Actions = {
    setInputValue: (value: string) => (dispatch: Dispatch) => {
        dispatch(setInputValue(value));
    },
    addNewGuest: (name: string) => (dispatch: Dispatch) => {
        console.log(`name=${name}`);
        if (name !== ''){
            dispatch(setInputValue(''));
            dispatch(guestsActions.addGuest(<IGuest>{name}))
        }
    }
};

export const reducer = createReducer<IStore, Action>(initialState)
    .handleAction(setInputValue, (state, { payload: inputValue }) => { return { ...state, inputValue } })