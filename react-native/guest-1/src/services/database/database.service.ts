import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import DataSnapshot = FirebaseDatabaseTypes.DataSnapshot;
import Query = FirebaseDatabaseTypes.Query;
import Reference = FirebaseDatabaseTypes.Reference;
import {IGuest, IGuestMutateSubscription, IGuestData} from '../../model/guest.model';
import {each} from 'lodash-es';

enum Paths {
  INTITES = '/intites',
}

export const pushGuest = async (userUid: string, data: IGuest) => {
  const ref = database().ref(`${Paths.INTITES}/${userUid}`);
  await ref.push(data);
};

export const updateGuest = async (userUid: string, data: IGuest) => {
  const ref = database().ref(`${Paths.INTITES}/${userUid}/${data.uid}`);
  await ref.set({
    ...data,
    uid: undefined,
  });
};

export const removeGuest = async (userUid: string, data: IGuest) => {
  const ref = database().ref(`${Paths.INTITES}/${userUid}/${data.uid}`);
  await ref.remove();
};

export const getGuests = async (userUid: string, filterProps?: any): Promise<IGuest[]> => {
  let ref: Query | Reference = database().ref(`${Paths.INTITES}/${userUid}`);

  each(filterProps, (value, key) => {
    if (value != null) {
      ref = ref.equalTo(value, key);
    }
  });

  const snapshot = (await ref.once('value')) || {};
  const values = snapshot.val() || {};
  return Object.keys(values).map(item => ({
    uid: item,
    ...values[item],
  }));
};

export const subscribeGuestMutation = (userUid: string, mutateSubscription: IGuestMutateSubscription): Function => {
  const ref = database().ref(`${Paths.INTITES}/${userUid}`);
  const {added, changed, removed} = mutateSubscription;
  // Get a firebase generated key, based on current time
  const startKey = (ref.push() as any).key;

  const addedFn = (snapshot: DataSnapshot) =>
    added({
      uid: snapshot.key,
      ...(snapshot.val() as IGuestData),
    });
  const changedFn = (snapshot: DataSnapshot) =>
    changed({
      uid: snapshot.key,
      ...(snapshot.val() as IGuestData),
    });
  const removedFn = (snapshot: DataSnapshot) =>
    removed({
      uid: snapshot.key,
      ...(snapshot.val() as IGuestData),
    });

  // 'startAt' this key, equivalent to 'start from the present second'
  ref
    .orderByKey()
    .startAt(startKey)
    .on('child_added', addedFn);
  ref.on('child_changed', changedFn);
  ref.on('child_removed', removedFn);

  // Unsubscribe from changes on unmount
  return () => {
    ref.off('child_added', addedFn);
    ref.off('child_changed', changedFn);
    ref.off('child_removed', removedFn);
  };
};
