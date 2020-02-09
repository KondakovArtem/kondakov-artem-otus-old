import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface IUserInfo extends IModifiableUserInfo {
  email: string;
  avatar: string;
  createdAt: Date;
  follows: string[];
  id: string;
}

export interface IModifiableUserInfo {
  about: string;
  birthDate?: Date;
  location: string;
  webSite: string;
  name: string;
}

export interface IUserInfoMutation {
  type: FirebaseFirestoreTypes.DocumentChangeType;
  doc: IUserInfo;
}
