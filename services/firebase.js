import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions"
import 'firebase/storage';

const firebaseConfig = { // Add your firebase config here
    apiKey: "00000",
    authDomain: "00000",
    projectId: "00000",
    storageBucket: "00000",
    messagingSenderId: "00000",
    appId: "00000"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


export const auth = firebase.auth;
export const db = firebase.firestore();
export const functions = firebase.functions();
export const FieldValue = firebase.firestore.FieldValue;
export const storage = firebase.storage();