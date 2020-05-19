import {TMutationType} from 'models/firebase.model';

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
  type: TMutationType;
  doc: IPost;
}
