import {auth} from 'firebase';
declare const gapi: any;

export const isAuth = () => !!auth().currentUser;
