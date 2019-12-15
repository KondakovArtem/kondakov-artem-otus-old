import { createReducer, createAction, Action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import uuid from 'react-native-uuid';

import { IGuest } from '../../model/guest';


export const ActionTypes = {
    ADD: '@guest/ADD',
    REMOVE: '@guest/remove',
    TOGGLE_COUPLE: '@guest/toggleCouple',
};


export interface IStore {
    list: IGuest[];
}

const initialState: IStore = {
    list: [
        {
            uid: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            name: 'John Smith',
            withCouple: true
        },
        {
            uid: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            name: 'Artem Kondakov',
            withCouple: false
        },
        {
            uid: '58694a0f-3da1-471f-bd96-145571e29d72',
            name: 'Ivan Rightman',
            withCouple: false
        },
      ]
};

const addGuest = createAction(ActionTypes.ADD, (guest: IGuest) => guest)<IGuest>();
const removeGuest = createAction(ActionTypes.REMOVE, (guest: IGuest) => guest)<IGuest>();
const toggleCouple = createAction(ActionTypes.TOGGLE_COUPLE, (guest: IGuest) => guest)<IGuest>();

export const Actions = {
    addGuest: (guest: IGuest) => {
        guest.uid = guest.uid  || uuid.v4();
        guest.withCouple = guest.withCouple || false;
        return addGuest(guest);
    },
    removeGuest: (guest: IGuest) => {
        return removeGuest(guest);
    },
    toggleCouple: (guest: IGuest) => (dispatch: Dispatch) => {
        dispatch(toggleCouple(guest));
    }
};

export const reducer = createReducer<IStore, Action>(initialState)
    .handleAction(addGuest, (state, { payload: guest }) => {
        console.log('adding guest') ;
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
        if (findIndex>-1){
            list[findIndex] = {
                ...list[findIndex],
                withCouple: !list[findIndex].withCouple
            }
        }

        console.log(`list=`,JSON.stringify(list));

        return { 
            ...state, 
            list
        } 
   })