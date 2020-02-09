import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface IPost {
  id: string;
  author: string;
  likes: string[];
  text: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IPostMutation {
  type: FirebaseFirestoreTypes.DocumentChangeType;
  doc: IPost;
}
