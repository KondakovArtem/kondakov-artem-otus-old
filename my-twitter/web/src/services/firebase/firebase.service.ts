import firebase from 'firebase/app';
// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyAGSfAgWHQuAzR3b82CWGE2r__al7FCbv4',
  authDomain: 'kondakov-artem-otus-guests.firebaseapp.com',
  databaseURL: 'https://kondakov-artem-otus-guests.firebaseio.com',
  projectId: 'kondakov-artem-otus-guests',
  storageBucket: 'kondakov-artem-otus-guests.appspot.com',
  messagingSenderId: '770505168148',
  appId: '1:770505168148:web:bd0a75aa34927537dede01',
  measurementId: 'G-0MYVYW3YH5',
});

export default firebase;
