import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {withAuth} from '@app/services/database/database.service';
import {DBPaths, SubscriptionTypes} from '@app/models/firebase.model';
import {IDBFollows} from '@app/models/user.model';
import {getDbSubscriber, registerDbSubscriber} from '@app/services/database/subscription.service';

export const toggleFollowDb = withAuth(async (uid, followUid: string) => {
  const docRef = firestore().doc(DBPaths.FOLLOWS({uid}));
  await firestore().runTransaction(async transaction => {
    const follows = ((await transaction.get(docRef)).data() || {}) as IDBFollows;
    const {ids = []} = follows;
    return transaction.set(docRef, {
      ...follows,
      ids: ids.includes(followUid) ? ids.filter(id => followUid !== id) : [...ids, followUid],
    } as IDBFollows);
  });
});

export const onDbFollowsChanged = (callback: (data: IDBFollows) => void) => {
  if (!getDbSubscriber('follows')) {
    const {currentUser} = auth();
    const {uid} = currentUser || {};
    registerDbSubscriber({
      alias: 'follows',
      path: DBPaths.FOLLOWS({uid}),
      callback,
      type: SubscriptionTypes.DOC,
    });
  }
};
