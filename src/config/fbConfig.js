import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// Initialize Firebase
const config = {
  apiKey: "AIzaSyAISWAeSwgffrXmXR1ekSBo0NytlwoOsBI",
  authDomain: "adifox-37688.firebaseapp.com",
  databaseURL: "https://adifox-37688.firebaseio.com",
  projectId: "adifox-37688",
  storageBucket: "adifox-37688.appspot.com",
  messagingSenderId: "155182142796"
};

firebase.initializeApp(config);
firebase.firestore();

const storage = firebase.storage();


export {
  storage, firebase as default
};