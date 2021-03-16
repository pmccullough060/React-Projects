import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  firebase from '@firebase/app';

require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDWIx0SK0AokDd2RFATKE4r45eEEUxhFSQ",
  authDomain: "evernote-clone-155d3.firebaseapp.com",
  projectId: "evernote-clone-155d3",
  storageBucket: "evernote-clone-155d3.appspot.com",
  messagingSenderId: "856869190145",
  appId: "1:856869190145:web:c77b9b27f0a1ac30321e00",
  measurementId: "G-RB5Q3W6ENS"
};

//Intialize Firebase
firebase.initializeApp(firebaseConfig);

//Here in the render method, react calls app which in turn calls its constituent functions.
//it then injects this into the 'evernote-container' div in the index.html file.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
