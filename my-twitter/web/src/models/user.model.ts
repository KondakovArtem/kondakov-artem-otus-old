import {TMutationType} from 'models/firebase.model';

export interface IUserInfo extends IModifiableUserInfo {
  email: string;
  avatar: string;
  createdAt: Date;
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
  type: TMutationType;
  doc: IUserInfo;
}

export interface IDBFollows {
  id: string;
  ids: string[];
}

export interface IDBFollowersMutation {
  type: TMutationType;
  doc: IDBFollows;
}
