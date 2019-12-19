import { createReducer, createAction, Action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import uuid from 'react-native-uuid';

import { IGuest } from '../../model/guest';
import { IConfiguredStore, GetStore } from '../store';


export const ActionTypes = {
    ADD: '@guest/ADD',
    REMOVE: '@guest/remove',
    TOGGLE_COUPLE: '@guest/TOGGLE_COUPLE',
    SET_EDITABLE_GUEST: '@guest/SET_EDITABLE_GUEST',
    UPDATE_GUEST_NAME: '@guest/UPDATE_GUEST_NAME'
};

// STORE
export interface IStore {
    list: IGuest[];
    editGuest?: IGuest;
}

const initialState: IStore = {
    list: [],
};

/// ACTIONS
const addGuest = createAction(ActionTypes.ADD, (guest: IGuest) => guest)<IGuest>();
const removeGuest = createAction(ActionTypes.REMOVE, (guest: IGuest) => guest)<IGuest>();
const toggleCouple = createAction(ActionTypes.TOGGLE_COUPLE, (guest: IGuest) => guest)<IGuest>();
const setEditableGuest = createAction(ActionTypes.SET_EDITABLE_GUEST, (guest?: IGuest) => guest)<IGuest>();
const updateGuestName = createAction(ActionTypes.UPDATE_GUEST_NAME, (uid: string, newName: string) => { return {
    newName,
    uid
}})();

export const Actions = {
    addGuest: (guest: IGuest) => {
        guest.uid = guest.uid || uuid.v4();
        guest.withPartner = guest.withPartner || false;
        return addGuest(guest);
    },
    removeGuest: (guest: IGuest) => {
        return removeGuest(guest);
    },
    toggleCouple: (guest: IGuest) => (dispatch: Dispatch) => {
        dispatch(toggleCouple(guest));
    },
    setEditableGuest: (guest?: IGuest) => (dispatch: Dispatch) => {
        dispatch(setEditableGuest(guest));
    },
    updateGuestName: (uid: string, newName: string = '') => (dispatch: Dispatch, getStore: GetStore) => {
        const store: IConfiguredStore = getStore();
        const { guests: {list}} = store
        if (newName === '') {
            const guest = list.find((item) => item.uid === uid);
            guest ? dispatch(removeGuest(guest)) : undefined;
        } else {
            dispatch(updateGuestName(uid, newName));
            dispatch(setEditableGuest());
        }
    }
};

/// REDUCERS
export const reducer = createReducer<IStore, Action>(initialState)
    .handleAction(addGuest, (state, { payload: guest }) => {
        return {
            ...state,
            list: [...state.list, guest]
        }
    })
    .handleAction(removeGuest, (state, { payload: guest }) => {
        return {
            ...state,
            list: state.list.filter(item => item !== guest)
        }
    })
    .handleAction(toggleCouple, (state, { payload: guest }) => {
        const list = [...state.list];
        const findIndex = list.findIndex(item => item.uid === guest.uid)
        if (findIndex > -1) {
            list[findIndex] = {
                ...list[findIndex],
                withPartner: !list[findIndex].withPartner
            }
        }
        return {
            ...state,
            list
        }
    })
    .handleAction(setEditableGuest, (state, { payload: editGuest }) => {
        return {
            ...state,
            editGuest: { ...editGuest }
        }
    })
    .handleAction(updateGuestName, (state, { payload }) => {
        const {uid, newName} = payload;
        return {
            ...state,
            list: state.list.map((guest) => {
                if (guest.uid === uid) {
                    return {
                        ...guest,
                        name: newName
                    }
                }
                return guest;
            }),
            editGuest: undefined
        };
    });
