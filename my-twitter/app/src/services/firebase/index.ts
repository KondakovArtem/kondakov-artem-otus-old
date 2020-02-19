import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export type User = FirebaseAuthTypes.User;
export type UserCredential = FirebaseAuthTypes.UserCredential;

export type AdditionalUserInfo = FirebaseAuthTypes.AdditionalUserInfo;
export type QuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot;
export type DocumentChangeType = FirebaseFirestoreTypes.DocumentChangeType;
export type CollectionReference = FirebaseFirestoreTypes.CollectionReference;
export type Query = FirebaseFirestoreTypes.Query;

const Timestamp = FirebaseFirestoreTypes.Timestamp;
export {firestore, auth, storage, Timestamp};
