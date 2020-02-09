import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {withAuth} from '@app/services/database/database.service';
import {DBPaths, SubscriptionTypes} from '@app/models/firebase.model';
import {IUserInfo, IUserInfoMutation} from '@app/models/user.model';
import {convertRawtoObject} from '@app/services/core/core.service';
import {getDbSubscriber, registerDbSubscriber} from '@app/services/database/subscription.service';

export const getUserInfo = withAuth(
  async (uid): Promise<IUserInfo> => {
    const userInfo = (
      await firestore()
        .doc(DBPaths.USERINFO({uid}))
        .get()
    ).data() as IUserInfo;

    return convertRawtoObject(userInfo) || {};
  },
);

export const updateUserInfo = withAuth(async (uid, userInfo: Partial<IUserInfo>) => {
  const docRef = firestore().doc(DBPaths.USERINFO({uid}));
  await firestore().runTransaction(async transaction => {
    const snapshotData = (await transaction.get(docRef)).data() as IUserInfo;
    return transaction.set(docRef, {
      ...snapshotData,
      ...userInfo,
      email: auth().currentUser?.email,
    });
  });
});

export const toggleFollowDb = withAuth(async (uid, followUid: string) => {
  const docRef = firestore().doc(DBPaths.USERINFO({uid}));
  await firestore().runTransaction(async transaction => {
    const info = (await transaction.get(docRef)).data() as IUserInfo;
    if (!info) {
      return;
    }
    const {follows = []} = info;
    return transaction.update(docRef, {
      follows: follows.includes(followUid) ? follows.filter(item => followUid !== item) : [...follows, followUid],
    } as Partial<IUserInfo>);
  });
});

export const onDbUserInfoChanged = (callback: (info: IUserInfo) => void) => {
  if (!getDbSubscriber('userInfo')) {
    const {currentUser} = auth();
    const {uid} = currentUser || {};
    registerDbSubscriber({
      alias: 'userInfo',
      path: DBPaths.USERINFO({uid}),
      callback,
      type: SubscriptionTypes.DOC,
    });
  }
};

export const onDbUsersChanged = (callback: (info: IUserInfoMutation[]) => void) => {
  if (!getDbSubscriber('users')) {
    registerDbSubscriber({
      alias: 'users',
      path: DBPaths.USERS(),
      callback,
      type: SubscriptionTypes.COLLECTION,
    });
  }
};
