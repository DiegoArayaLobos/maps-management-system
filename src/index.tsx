import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./design/core/GlobalStyle";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";
import { CssBaseline } from '@mui/material';
import firebase, { firebaseConfig } from "./config/firebaseConfig";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { reduxFirestore, createFirestoreInstance, getFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from "@mui/material/colors";

declare module '@mui/material/styles' {
    interface Theme {
        palette: {
            primary: string;
            secondary: string;
        };
    }
}

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: amber,
    },
});

const firebaseApp: any = firebase;
const firebaseConfiguration: any = firebaseConfig;

const store = createStore(rootReducer, compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebaseApp, firebaseConfiguration)));

const profileSpecificProps = {
    ...firebaseConfiguration,
    userProfile: "User",
    useFirestoreForProfile: true,
    enableRedirectHandling: true,
    resetBeforeLogin: false,
};

const rrfProps = {
    firebase,
    config: profileSpecificProps,
    dispatch: store.dispatch,
    createFirestoreInstance,
    userProfile: "User",
    presence: "presence",
    sessions: "sessions",
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <GlobalStyle />
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
