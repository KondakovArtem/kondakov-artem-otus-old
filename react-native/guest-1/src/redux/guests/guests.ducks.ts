import {createReducer, createAction, Action} from 'typesafe-actions';
import {Dispatch} from 'redux';

import {ActionTypes as commonActionsTypes} from '../common/common.ducks';
import {IGuest} from '../../model/guest.model';
import {GetStore} from '../store';
import * as db from '../../services/database/database.service';

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
  UPDATE_GUEST: '@guest/UPDATE_GUEST',
  UPDATE_FILTER: '@guest/UPDATE_FILTER',
  FILL: '@guest/FILL',
};

// STORE
export interface IStore {
  list: IGuest[];
  editGuest?: IGuest;
  filter: FilterTypes;
}

const initialState: IStore = {
  list: [],
  filter: 0,
  editGuest: undefined,
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

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
const addGuest = createAction(ActionTypes.ADD, (guest: IGuest) => guest)();
const removeGuest = createAction(ActionTypes.REMOVE, (guest: IGuest) => guest)();
const toggleCouple = createAction(ActionTypes.TOGGLE_COUPLE, (guest: IGuest) => guest)();
const setEditableGuest = createAction(ActionTypes.SET_EDITABLE_GUEST, (guest?: IGuest) => guest)();
const updateGuestName = createAction(ActionTypes.UPDATE_GUEST_NAME, (uid: string, newName: string) => ({
  newName,
  uid,
}))();
const updateGuest = createAction(ActionTypes.UPDATE_GUEST, (guest: IGuest) => guest)();
const updateGuestFilter = createAction(ActionTypes.UPDATE_FILTER, (idx: number) => idx)();
const fillGuests = createAction(ActionTypes.FILL, (guests: IGuest[]) => guests)();
const signOutClear = createAction(commonActionsTypes.SIGN_OUT_CLEAR, () => {})();

function getUserUidFromStore(getStore: GetStore) {
  const {
    login: {userUid},
  } = getStore();
  return userUid;
}

export const Actions = {
  fetchGuests: () => (dispatch: Dispatch, getStore: GetStore) => {
    const userUid = getUserUidFromStore(getStore);
    const {
      guests: {filter = 0},
    } = getStore();

    const filterRemap = {
      [FilterTypes.WITHOUT_PARTNER]: false,
      [FilterTypes.WITH_PARTNER]: true,
      [FilterTypes.ALL]: undefined,
    };

    return db
      .getGuests(userUid, {
        withPartner: filterRemap[filter],
      })
      .then(result => {
        dispatch(fillGuests(result));
      });
  },

  initGuest: () => (dispatch: Dispatch, getStore: GetStore) => {
    const userUid = getUserUidFromStore(getStore);
    Actions.fetchGuests()(dispatch, getStore);
    return db.subscribeGuestMutation(userUid, {
      added: (guest: IGuest) => {
        dispatch(addGuest(guest));
      },
      changed: (guest: IGuest) => {
        dispatch(updateGuest(guest));
      },
      removed: (guest: IGuest) => {
        dispatch(removeGuest(guest));
      },
    });
  },
  addGuest: (guest: IGuest) => async (dispatch: Dispatch, getStore: GetStore) => {
    guest.withPartner = guest.withPartner || false;
    const userUid = getUserUidFromStore(getStore);
    db.pushGuest(userUid, guest);
  },
  removeGuest: (guest: IGuest) => async (dispatch: Dispatch, getStore: GetStore) => {
    const userUid = getUserUidFromStore(getStore);
    db.removeGuest(userUid, guest);
  },
  togglePartner: (guest: IGuest) => (dispatch: Dispatch, getStore: GetStore) => {
    const userUid = getUserUidFromStore(getStore);
    db.updateGuest(userUid, {
      ...guest,
      withPartner: !guest.withPartner,
    });
  },
  setEditableGuest: (guest?: IGuest) => (dispatch: Dispatch) => {
    dispatch(setEditableGuest(guest));
  },
  updateGuestName: (uid: string, newName: string = '') => (dispatch: Dispatch, getStore: GetStore) => {
    const userUid = getUserUidFromStore(getStore);
    const {guests} = getStore();
    const {list} = guests;

    const guest = list.find(item => item.uid === uid);
    if (guest) {
      if (!newName) {
        db.removeGuest(userUid, guest);
      } else {
        db.updateGuest(userUid, {
          ...guest,
          name: newName,
        });
      }
    }
  },
  updateGuestFilter: (idx: number) => async (dispatch: Dispatch) => {
    dispatch(updateGuestFilter(idx));
  },
};

/////////////////////////////////////////////
/// REDUCERS
/////////////////////////////////////////////
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
  })
  .handleAction(fillGuests, (state, {payload}) => {
    return {
      ...state,
      list: payload,
    };
  })
  .handleAction(signOutClear, state => {
    return {
      ...state,
      ...initialState,
    };
  })
  .handleAction(updateGuest, (state, {payload}) => {
    const {uid} = payload;
    return {
      ...state,
      list: state.list.map(guest => {
        if (guest.uid === uid) {
          return payload;
        }
        return guest;
      }),
      editGuest: undefined,
    };
  });
