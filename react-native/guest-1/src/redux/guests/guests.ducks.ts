import {createReducer, createAction, Action} from 'typesafe-actions';
import {Dispatch} from 'redux';

import {ActionTypes as commonActionsTypes, Actions as commonActions} from '@app/redux/common/common.ducks';
import {IGuest, IGuestMeta, IGuestData} from '@app/model/guest.model';
import {GetStore} from '@app/redux/store';
import * as db from '@app/services/database/database.service';
import {NavAliases} from '@app/model/navigation.model';
const {GUEST_DETAILS_SCREEN} = NavAliases;

export enum FilterTypes {
  ALL = 0,
  WITH_PARTNER = 1,
  WITHOUT_PARTNER = 2,
}

export const ActionTypes = {
  ADD: '@guest/ADD',
  REMOVE: '@guest/REMOVE',
  TOGGLE_COUPLE: '@guest/TOGGLE_COUPLE',
  SET_EDITABLE_GUEST: '@guest/SET_EDITABLE_GUEST',
  UPDATE_GUEST_NAME: '@guest/UPDATE_GUEST_NAME',
  UPDATE_GUEST: '@guest/UPDATE_GUEST',
  UPDATE_FILTER: '@guest/UPDATE_FILTER',
  FILL: '@guest/FILL',
  TO_REMOVED: '@guest/TO_REMOVED',
  SET_EDIT_DETAILS: '@guest/SET_EDIT_DETAILS',
};

// STORE
export interface IStore {
  list: IGuest[];
  editGuest?: IGuestMeta;
  filter: FilterTypes;
  removedUids: string[];
}

const initialState: IStore = {
  list: [],
  filter: 0,
  editGuest: undefined,
  removedUids: [],
};

export const filterGuest = (list: IGuest[], filter: FilterTypes): IGuest[] => {
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
};

/////////////////////////////////////////////
/// ACTIONS
/////////////////////////////////////////////
const addGuest = createAction(ActionTypes.ADD, (guest: IGuest) => guest)();
const removeGuest = createAction(ActionTypes.REMOVE, (guest: IGuest) => guest)();
const markToRemoveGuest = createAction(ActionTypes.TO_REMOVED, (guest: IGuest) => guest)();
const toggleCouple = createAction(ActionTypes.TOGGLE_COUPLE, (guest: IGuest) => guest)();
const setEditableGuest = createAction(ActionTypes.SET_EDITABLE_GUEST, (guestMeta?: IGuestMeta) => guestMeta)();
const updateGuestName = createAction(ActionTypes.UPDATE_GUEST_NAME, (uid: string, newName: string) => ({
  newName,
  uid,
}))();
const updateGuest = createAction(ActionTypes.UPDATE_GUEST, (guest: IGuest) => guest)();
const updateGuestFilter = createAction(ActionTypes.UPDATE_FILTER, (idx: number) => idx)();
const fillGuests = createAction(ActionTypes.FILL, (guests: IGuest[]) => guests)();
const setEditDetails = createAction(ActionTypes.SET_EDIT_DETAILS, (details: string) => details)();
const signOutClear = createAction(commonActionsTypes.SIGN_OUT_CLEAR, () => {})();

function getUserUidFromStore(getStore: GetStore) {
  const {
    common: {userUid},
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
  markToDeleteGuest: (guest: IGuest) => async (dispatch: Dispatch) => {
    dispatch(markToRemoveGuest(guest));
  },
  togglePartner: (guest: IGuest) => (dispatch: Dispatch, getStore: GetStore) => {
    const userUid = getUserUidFromStore(getStore);
    db.updateGuest(userUid, {
      ...guest,
      withPartner: !guest.withPartner,
    });
  },
  updateGuest: () => (dispatch: Dispatch, getStore: GetStore) => {
    const userUid = getUserUidFromStore(getStore);
    const {guests} = getStore();
    const {editGuest} = guests;
    const {name, details, withPartner, uid} = editGuest as IGuestMeta;
    db.updateGuest(userUid, {
      uid,
      name,
      details,
      withPartner,
    } as IGuestData);
    commonActions.navigate(NavAliases.MAIN_SCREEN)();
  },

  setEditableGuest: (guest?: IGuest) => (dispatch: Dispatch) => {
    dispatch(setEditableGuest(guest));
  },
  setEditDetails: (details: string) => (dispatch: Dispatch) => {
    dispatch(setEditDetails(details));
  },
  updateGuestName: (uid: string, newName: string = '') => (dispatch: Dispatch, getStore: GetStore) => {
    const userUid = getUserUidFromStore(getStore);
    const {guests} = getStore();
    const {list} = guests;

    const guest = list.find(item => item.uid === uid);
    if (guest) {
      if (!newName) {
        Actions.removeGuest(guest)(dispatch, getStore);
      } else {
        db.updateGuest(userUid, {
          ...guest,
          name: newName,
        });
      }
      dispatch(setEditableGuest());
    }
  },
  updateGuestFilter: (idx: number) => async (dispatch: Dispatch) => {
    dispatch(updateGuestFilter(idx));
  },
  selectGuest: (guest?: IGuest) => (dispatch: Dispatch) => {
    dispatch(
      setEditableGuest({
        ...(guest as IGuestData),
        withDetails: true,
      }),
    );
    commonActions.navigate(GUEST_DETAILS_SCREEN)();
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
  .handleAction(markToRemoveGuest, (state, {payload: guest}) => {
    return {
      ...state,
      removedUids: [...state.removedUids, guest.uid],
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
  })
  .handleAction(setEditDetails, (state, {payload}) => ({
    ...state,
    editGuest: {
      ...(state.editGuest as IGuestMeta),
      details: payload,
    },
  }));
