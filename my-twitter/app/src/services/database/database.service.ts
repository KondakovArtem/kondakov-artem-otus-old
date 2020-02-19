import {Platform} from 'react-native';
import {auth, storage} from 'services/firebase';

export const withAuth = <T extends any[], U>(fn: (uid: string, ...args: T) => U) => {
  return (...args: T): U => {
    const {currentUser} = auth();
    if (!currentUser) {
      throw new Error('Request is unauthorized');
    }
    const {uid} = currentUser;
    return fn(uid, ...args);
  };
};

export const uploadImage = withAuth(async (uid: string, localUri: string, path: string) => {
  const uploadUri = Platform.OS === 'ios' ? localUri.replace('file://', '') : localUri;
  const imageRef = storage().ref(`${uid}/${path}`);
  await imageRef.putFile(uploadUri);
  return imageRef.getDownloadURL();
});

export async function getStorageFileUrl(path: string) {
  try {
    return await storage()
      .ref(path)
      .getDownloadURL();
  } catch (e) {
    return null;
  }
}
