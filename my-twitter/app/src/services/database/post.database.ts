import {max, isEmpty} from 'lodash-es';
import {firestore, auth} from 'services/firebase';

import {withAuth} from 'services/database/database.service';
import {DBPaths, SubscriptionTypes} from 'models/firebase.model';
import {IPost, IPostMutation} from 'models/post.model';
import {getDbSubscriber, registerDbSubscriber} from 'services/database/subscription.service';
import {convertRawtoObject} from 'services/core/core.service';

export const toggleLikeDbPost = withAuth(async (uid, id: string) => {
  const docRef = firestore().doc(DBPaths.POST({id}));
  await firestore().runTransaction(async transaction => {
    const post = (await transaction.get(docRef)).data() as IPost;
    if (!post) {
      return;
    }
    const {likes = []} = post;
    return transaction.update(docRef, {
      likes: likes.includes(uid) ? likes.filter(item => uid !== item) : [...likes, uid],
    });
  });
});

export const createNewPost = withAuth(
  async (uid: string, post: Partial<IPost>): Promise<void> => {
    await firestore()
      .collection(DBPaths.POSTS())
      .add({
        ...post,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        deleteAt: null,
        author: uid,
      });
  },
);

export const deleteDBPost = withAuth(
  async (uid: string, post: IPost): Promise<void> => {
    await firestore()
      .doc(DBPaths.POST(post))
      .update({
        deleteAt: firestore.FieldValue.serverTimestamp(),
      });
  },
);

export const onDbUserPostChanged = (count: number, callback: (info: IPostMutation[]) => void) => {
  if (!getDbSubscriber('userPosts')) {
    count = max([50, count]) as number;
    const {currentUser} = auth();
    const {uid} = currentUser || {};
    registerDbSubscriber({
      alias: 'userPosts',
      path: DBPaths.POSTS(),
      filter: collection =>
        collection
          .where('author', '==', uid)
          .where('deleteAt', '==', null)
          .orderBy('createdAt', 'desc')
          .limit(count),
      callback,
      type: SubscriptionTypes.COLLECTION,
    });
  }
};

export const getDBUserPosts = withAuth(
  async (uid, count: number): Promise<IPost[]> => {
    count = max([50, count]) as number;
    const items = await firestore()
      .collection(DBPaths.POSTS())
      .where('author', '==', uid)
      .where('deleteAt', '==', null)
      .orderBy('createdAt', 'desc')
      .limit(count)
      .get();

    return items.docs.map(docMeta =>
      convertRawtoObject({
        ...docMeta.data(),
        id: docMeta.id,
      }),
    );
  },
);

export const getDBFollowPosts = withAuth(
  async (uid, count: number, ids: string[] = []): Promise<IPost[]> => {
    if (isEmpty(ids)) {
      return [];
    }
    count = max([50, count]) as number;
    const items = await firestore()
      .collection(DBPaths.POSTS())
      .where('author', 'in', [...ids, uid])
      .where('deleteAt', '==', null)
      .orderBy('createdAt', 'desc')
      .limit(count)
      .get();

    return items.docs.map(docMeta =>
      convertRawtoObject({
        ...docMeta.data(),
        id: docMeta.id,
      }),
    );
  },
);

export const onDbFollowsPostChanged = (
  count: number,
  ids: string[] = [],
  callback: (info: IPostMutation[]) => void,
) => {
  if (!getDbSubscriber('followPosts')) {
    count = max([50, count]) as number;
    registerDbSubscriber({
      alias: 'followPosts',
      path: DBPaths.POSTS(),
      filter: collection =>
        collection
          .where('author', 'in', ids)
          .where('deleteAt', '==', null)
          .orderBy('createdAt', 'desc')
          .limit(count),
      callback,
      type: SubscriptionTypes.COLLECTION,
    });
  }
};
