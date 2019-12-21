import {createReducer, createAction, Action} from 'typesafe-actions';
import {Dispatch} from 'redux';
import uuid from 'react-native-uuid';

import {IGuest} from '../../model/guest';
import {IConfiguredStore, GetStore} from '../store';

export enum FilterTypes {
  ALL = 0,
  WITH_PARTNER = 1,
  WITHOUT_PARTNER = 2,
}

export const ActionTypes = {
  ADD: '@guest/ADD',
  REMOVE: '@guest/remove',
  TOGGLE_COUPLE: '@guest/TOGGLE_COUPLE',
  SET_EDITABLE_GUEST: '@guest/SET_EDITABLE_GUEST',
  UPDATE_GUEST_NAME: '@guest/UPDATE_GUEST_NAME',
  UPDATE_FILTER: '@guest/UPDATE_FILTER',
};

// STORE
export interface IStore {
  list: IGuest[];
  editGuest?: IGuest;
  filter: number;
}

const initialState: IStore = {
  list: [],
  filter: 0,
};

export function filterGuest(list: IGuest[], filter: FilterTypes): IGuest[] {
  if (filter === FilterTypes.ALL) {
    return list;
  }
  if (filter === FilterTypes.WITH_PARTNER) {
    return list.filter(item => item.withPartner);
  }
  if (filter === FilterTypes.WITHOUT_PARTNER) {
    return list.filter(item => !item.withPartner);
  }
  return list;
}

/// ACTIONS
const addGuest = createAction(ActionTypes.ADD, (guest: IGuest) => guest)();

const removeGuest = createAction(
  ActionTypes.REMOVE,
  (guest: IGuest) => guest,
)();

const toggleCouple = createAction(
  ActionTypes.TOGGLE_COUPLE,
  (guest: IGuest) => guest,
)<IGuest>();

const setEditableGuest = createAction(
  ActionTypes.SET_EDITABLE_GUEST,
  (guest?: IGuest) => guest,
)<IGuest>();

const updateGuestName = createAction(
  ActionTypes.UPDATE_GUEST_NAME,
  (uid: string, newName: string) => {
    return {
      newName,
      uid,
    };
  },
)();

const updateGuestFilter = createAction(
  ActionTypes.UPDATE_FILTER,
  (idx: number) => idx,
)();

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
  updateGuestName: (uid: string, newName: string = '') => (
    dispatch: Dispatch,
    getStore: GetStore,
  ) => {
    const store: IConfiguredStore = getStore();
    const {
      guests: {list},
    } = store;
    if (!newName) {
      const guest = list.find(item => item.uid === uid);
      guest && dispatch(removeGuest(guest));
    } else {
      dispatch(updateGuestName(uid, newName));
      dispatch(setEditableGuest());
    }
  },
  updateGuestFilter: (idx: number) => (dispatch: Dispatch) => {
    dispatch(updateGuestFilter(idx));
  },
};

/// REDUCERS
export const reducer = createReducer<IStore, Action>(initialState)
  .handleAction(addGuest, (state, {payload: guest}) => {
    return {
      ...state,
      list: [...state.list, guest],
    };
  })
  .handleAction(removeGuest, (state, {payload: guest}) => {
    return {
      ...state,
      list: state.list.filter(item => item.uid !== guest.uid),
    };
  })
  .handleAction(toggleCouple, (state, {payload: guest}) => {
    return {
      ...state,
      list: state.list.map(item => {
        return item.uid === guest.uid
          ? {
              ...item,
              withPartner: !item.withPartner,
            }
          : item;
      }),
    };
  })
  .handleAction(setEditableGuest, (state, {payload: editGuest}) => {
    return {
      ...state,
      editGuest: editGuest,
    };
  })
  .handleAction(updateGuestName, (state, {payload}) => {
    const {uid, newName} = payload;
    return {
      ...state,
      list: state.list.map(guest => {
        if (guest.uid === uid) {
          return {
            ...guest,
            name: newName,
          };
        }
        return guest;
      }),
      editGuest: undefined,
    };
  })
  .handleAction(updateGuestFilter, (state, {payload}) => {
    return {
      ...state,
      filter: payload,
    };
  });
