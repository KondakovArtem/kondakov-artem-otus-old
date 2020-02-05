import firestore from '@react-native-firebase/firestore';

import {withAuth} from '@app/services/database/database.service';
import {DBPaths} from '@app/models/firebase.model';
import {convertRawtoObject} from '@app/services/core/core.service';
import {IPost} from '@app/models/post.model';
import {each} from 'lodash-es';

export const getUserPosts = withAuth(async uid => {
  const items = await firestore()
    .collection(DBPaths.POSTS())
    .orderBy('created')
    .where('author', '==', uid)
    .limit(10)
    .get();

  debugger;
  return [] as IPost[];

  //   return Object.keys(items.docs).map((id: string) => ({
  //     ...items[id],
  //     id,
  //   }));

  //   each(items, (post, id) => {});

  //   return convertRawtoObject(
  //     await firestore()
  //       .collection(DBPaths.POSTS())
  //       .orderBy('created')
  //       .where('author', '==', uid)
  //       .limit(10)
  //       .get(),
  //   );
});

export const createNewPost = withAuth(
  async (uid: string, post: Partial<IPost>): Promise<IPost> => {
    const docRef = await firestore()
      .collection(DBPaths.POSTS())
      .add({
        ...post,
        created: firestore.FieldValue.serverTimestamp(),
        author: uid,
      });
    const res = (await docRef.get()).data;
    return {
      ...res,
      id: docRef.id,
    } as IPost;
  },
);
