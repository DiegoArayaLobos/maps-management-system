import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/functions";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
    //Private
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

firebase.analytics();

export default firebase;
