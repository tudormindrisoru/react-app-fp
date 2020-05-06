import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers/reducers';

var firebaseConfig = {
  apiKey: "AIzaSyA-SCRKPiVzob3hRbevuSFdc6at2J4GuT8",
  authDomain: "git-battle-77f06.firebaseapp.com",
  databaseURL: "https://git-battle-77f06.firebaseio.com",
  projectId: "git-battle-77f06",
  storageBucket: "git-battle-77f06.appspot.com",
  messagingSenderId: "285811176746",
  appId: "1:285811176746:web:710bbf5599243e36da1a53",
  measurementId: "G-J234BDHQRG"
};

firebase.initializeApp(firebaseConfig);

const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
