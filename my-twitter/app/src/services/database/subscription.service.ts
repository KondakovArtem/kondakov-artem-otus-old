import firestore from '@react-native-firebase/firestore';
import {SubscriptionTypes, IDbSubscription, IRegisterDbSubscription} from '@app/models/firebase.model';
import {each} from 'lodash-es';
import {convertRawtoObject} from '../core/core.service';

export const subscriptions: {
  [alias: string]: IDbSubscription;
} = {};

export const registerDbSubscriber = ({alias, path, type, callback}: IRegisterDbSubscription) => {
  let unsubscribe;
  if (type === SubscriptionTypes.DOC) {
    unsubscribe = firestore()
      .doc(path)
      .onSnapshot(querySnapshot => callback(convertRawtoObject(querySnapshot.data())));
  } else {
    unsubscribe = firestore()
      .collection(path)
      .onSnapshot(querySnapshot => callback(convertRawtoObject(querySnapshot.docs)));
  }
  const {unsubscribes = []} = subscriptions[alias] || {};
  subscriptions[alias] = {
    path,
    unsubscribes: [...unsubscribes, unsubscribe],
  };
};

export const unregisterDbSubscriber = (alias: string) => {
  if (subscriptions[alias]) {
    each(subscriptions[alias].unsubscribes, unsubscribe => unsubscribe());
    delete subscriptions[alias];
  }
};

export const unregisterAllDbSubsribers = () => {
  each(subscriptions, (data, alias) => {
    unregisterDbSubscriber(alias);
  });
};

export const getDbSubscriber = (alias: string) => {
  return subscriptions[alias];
};
