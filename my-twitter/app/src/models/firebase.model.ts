import {template} from 'lodash-es';
import {CollectionReference, Query} from 'services/firebase';

export enum FirebaseError {
  EMAIL_INVALID = 'auth/invalid-email',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  OPERATION_NOT_ALLOWED = 'auth/operation-not-allowed',
  WEAK_PASSWORD = 'auth/weak-password',
  USER_DISABLED = 'auth/user-disabled',
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
}

export enum SubscriptionTypes {
  DOC = 'doc',
  COLLECTION = 'collection',
}

export const DBPaths = {
  USERINFO: template('users/${uid}'),
  USERS: template('users'),
  POSTS: template('posts'),
  POST: template('posts/${id}'),
  FOLLOWS: template('follows/${uid}'),
  FOLLOWERS: template('follows'),
};

export interface IRegisterDbSubscription {
  alias: string;
  path: string;
  type: SubscriptionTypes;
  filter?(ref: CollectionReference): Query;
  callback(data: any | any[]): void;
}

export interface IDbSubscription {
  path: string;
  unsubscribes: (() => void)[];
}

export interface IDBDocument {
  createdAt: Date;
  [key: string]: any;
}
