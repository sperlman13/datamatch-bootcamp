import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/database';

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'

import {composeWithDevTools} from 'redux-devtools-extension';

const firebaseConfig = {
  apiKey: "AIzaSyC_8iETlUIN_VOnDSdO41IWOHOVrZGvtDw",
  authDomain: "datamatch-bootcamp-d21ac.firebaseapp.com",
  databaseURL: "https://datamatch-bootcamp-d21ac-default-rtdb.firebaseio.com",
  projectId: "datamatch-bootcamp-d21ac",
  storageBucket: "datamatch-bootcamp-d21ac.appspot.com",
  messagingSenderId: "61354348885",
  appId: "1:61354348885:web:15169e9c1d4ddcad9a9fdc"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const store = createStore(rootReducer, {});

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
   <Provider store = {store}> 
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter><App /></BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById('root')
);