import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import mapsReducer from "./mapsReducer";

const rootReducer = combineReducers({
    maps: mapsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});

export default rootReducer;
