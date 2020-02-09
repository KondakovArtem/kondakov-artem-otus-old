import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {SubscriptionTypes, IDbSubscription, IRegisterDbSubscription, IDBDocument} from '@app/models/firebase.model';
import {each} from 'lodash-es';
import {convertRawtoObject} from '../core/core.service';

export const subscriptions: {
  [alias: string]: IDbSubscription;
} = {};

interface IMutation {
  type: FirebaseFirestoreTypes.DocumentChangeType;
  doc: any;
}

const getMutationSubsr = (callback: (mutationList: IMutation[]) => void) => (
  snapshot: FirebaseFirestoreTypes.QuerySnapshot,
  error?: Error,
) => {
  if (error) {
    console.log(error);
  }
  const docMutationList: IMutation[] = snapshot.docChanges().map(({doc: docMeta, type}) => {
    const doc: IDBDocument = convertRawtoObject({
      ...docMeta.data(),
      id: docMeta.id,
    });
    return {
      type,
      doc: {
        ...doc,
        createdAt: doc.createdAt || new Date(),
      },
    };
  });
  docMutationList.length && callback(docMutationList);
};

// const getSubscr = (callback: (docList: IDBDocument[]) => void) => (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
//   callback(
//     snapshot.docs.map(docMeta => {
//       const doc: IDBDocument = convertRawtoObject({
//         ...docMeta.data(),
//         id: docMeta.id,
//       });
//       return {
//         ...doc,
//         created: doc.created || new Date(),
//       };
//     }),
//   );
// };

export const registerDbSubscriber = ({alias, path, type, callback, filter}: IRegisterDbSubscription) => {
  let unsubscribe;
  if (type === SubscriptionTypes.DOC) {
    unsubscribe = firestore()
      .doc(path)
      .onSnapshot(querySnapshot => callback(convertRawtoObject(querySnapshot.data())));
  } else {
    let colReference = firestore().collection(path);
    unsubscribe = filter
      ? filter(colReference).onSnapshot(getMutationSubsr(callback))
      : colReference.onSnapshot(getMutationSubsr(callback));
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
