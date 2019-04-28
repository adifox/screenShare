import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import data from './apiKey.json';
// Initialize Firebase
const config = {
  apiKey: data.key.apiKey,
  authDomain: data.key.authDomain,
  databaseURL: data.key.databaseURL,
  projectId: data.key.projectId,
  storageBucket: data.key.storageBucket,
  messagingSenderId: data.key.messagingSenderId
}

firebase.initializeApp(config);
firebase.firestore();

const storage = firebase.storage();

export {
  storage, firebase as default
};