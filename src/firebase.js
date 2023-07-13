// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwy0QaHWv7JxSXTcpspA7N9ZOAyZ32wjQ",
  authDomain: "wtsapp-cloning.firebaseapp.com",
  projectId: "wtsapp-cloning",
  storageBucket: "wtsapp-cloning.appspot.com",
  messagingSenderId: "68884071004",
  appId: "1:68884071004:web:69c04d07552ed704201c99",
  measurementId: "G-R80LHBT268"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
export {db};