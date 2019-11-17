//import { createActions, handleActions } from 'redux-actions';
import { createReducer, createAction, Action } from 'typesafe-actions';
import { IMessage, IMessageData } from "../../models/message.model";
import { uniqueId } from 'lodash-es';

import ActionTypes from './action.types';

export type IStore = IMessage[];

const initialState: IStore = [];
const UID_PREFIX = 'message';

const add = createAction(ActionTypes.ADD, (message: IMessageData) => {
    return {
        ...message,
        id: uniqueId(UID_PREFIX)
    };
})<IMessage>();
const remove = createAction(ActionTypes.REMOVE, (message: IMessage) => (message))<IMessage>();


export const Actions = {
    showSuccess: (text: string) => {
        return add({
            variant: 'success',
            text
        });
    },
    showError: (text) => {
        return add({
            variant: 'error',
            text
        });
    },
    showWarn: (text) => {
        return add({
            variant: 'warning',
            text
        });
    },
    remove,
    add
};

export const reducer = createReducer<IStore, Action>(initialState)
    .handleAction(add, (state, { payload: message }) => [...state, message])
    .handleAction(remove, (state, { payload: message }) => state.filter(item => item !== message))
