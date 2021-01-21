import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRGdXwb3_OgVeECVSkwlJHOjpJUbhDkGM",
  authDomain: "daily-moments-5ee69.firebaseapp.com",
  projectId: "daily-moments-5ee69",
  storageBucket: "daily-moments-5ee69.appspot.com",
  messagingSenderId: "926476402217",
  appId: "1:926476402217:web:466df2806202620d2fe638",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
