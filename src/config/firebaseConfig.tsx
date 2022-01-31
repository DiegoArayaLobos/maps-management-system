import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/functions";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyC0q6mhE_n73rBWWfKjbTzOqvWR-uZCKWU",
    authDomain: "map-management-system-7d8a5.firebaseapp.com",
    projectId: "map-management-system-7d8a5",
    storageBucket: "map-management-system-7d8a5.appspot.com",
    messagingSenderId: "667859740911",
    appId: "1:667859740911:web:7ad4cd6e027a633ba1d31a",
    measurementId: "G-TGTRXNJ0HR"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

firebase.analytics();

export default firebase;
