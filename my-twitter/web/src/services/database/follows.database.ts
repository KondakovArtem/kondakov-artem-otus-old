import {auth, firestore} from 'services/firebase';

import {withAuth} from 'services/database/database.service';
import {DBPaths, SubscriptionTypes} from 'models/firebase.model';
import {IDBFollows, IDBFollowersMutation} from 'models/user.model';
import {getDbSubscriber, registerDbSubscriber} from 'services/database/subscription.service';

export const toggleFollowDb = withAuth(async (uid, followUid: string) => {
  const docRef = firestore().doc(DBPaths.FOLLOWS({uid}));
  await firestore().runTransaction(async transaction => {
    const follows = ((await transaction.get(docRef)).data() || {}) as IDBFollows;
    const {ids = []} = follows;
    let newIds = ids.includes(followUid) ? ids.filter(id => followUid !== id) : [...ids, followUid];
    newIds = newIds.filter(id => id !== uid);

    return transaction.set(docRef, {
      ...follows,
      ids: newIds,
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

export const onDbFollowersChanged = (callback: (data: IDBFollowersMutation[]) => void) => {
  if (!getDbSubscriber('followers')) {
    const {currentUser = {}} = auth();
    const {uid} = currentUser as any;
    registerDbSubscriber({
      alias: 'followers',
      path: DBPaths.FOLLOWERS(),
      filter: collection => collection.where('ids', 'array-contains', uid),
      callback,
      type: SubscriptionTypes.COLLECTION,
    });
  }
};

// export const getDBFollowers = withAuth(async uid => {
//   const snapshot = await firestore()
//     .collection(DBPaths.FOLLOWERS())
//     .where('ids', 'array-contains', uid)
//     .get();
//   const docs = snapshot.docs;
//   return docs.map(({id}) => id);
// });
