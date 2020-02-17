import {GOOGLE_WEB_CLIENT_ID} from 'constants/auth';
import firebase, {auth} from 'firebase';

declare const gapi: any;

export const isAuth = () => !!auth().currentUser;

export const signInWithGoogle = async (data: any) => {
  // debugger;
  const credential = auth.GoogleAuthProvider.credential(data.tokenId);
  const {additionalUserInfo} = await auth().signInWithCredential(credential);
  const {profile} = additionalUserInfo as auth.AdditionalUserInfo;
  const {email, name, picture} = profile as any;
  console.log(auth().currentUser);
};
