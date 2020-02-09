import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {withAuth} from '@app/services/database/database.service';
import {DBPaths, SubscriptionTypes} from '@app/models/firebase.model';
import {IPost, IPostMutation} from '@app/models/post.model';
import {getDbSubscriber, registerDbSubscriber} from './subscription.service';

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

// export const getUserPosts = withAuth(async uid => {
//   const items = await firestore()
//     .collection(DBPaths.POSTS())
//     .orderBy('created')
//     .where('author', '==', uid)
//     .limit(10)
//     .get();

//   return [] as IPost[];

//   //   return Object.keys(items.docs).map((id: string) => ({
//   //     ...items[id],
//   //     id,
//   //   }));

//   //   each(items, (post, id) => {});

//   //   return convertRawtoObject(
//   //     await firestore()
//   //       .collection(DBPaths.POSTS())
//   //       .orderBy('created')
//   //       .where('author', '==', uid)
//   //       .limit(10)
//   //       .get(),
//   //   );
// });

export const createNewPost = withAuth(
  async (uid: string, post: Partial<IPost>): Promise<void> => {
    await firestore()
      .collection(DBPaths.POSTS())
      .add({
        ...post,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        author: uid,
      });
  },
);

export const deletePost = withAuth(
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
    const {currentUser} = auth();
    const {uid} = currentUser || {};
    registerDbSubscriber({
      alias: 'userPosts',
      path: DBPaths.POSTS(),
      filter: collection =>
        collection
          .where('author', '==', uid)
          .orderBy('createdAt', 'desc')
          .limit(count),
      callback,
      type: SubscriptionTypes.COLLECTION,
    });
  }
};
