import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router  } from 'react-router-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';

firebase.initializeApp({
  apiKey: "AIzaSyDVRtz3Vac8qhXpaFuHs4qc4g5oB1maHpM",
  authDomain: "fir-kurs-2020.firebaseapp.com",
  databaseURL: "https://fir-kurs-2020.firebaseio.com",
  projectId: "fir-kurs-2020",
  storageBucket: "fir-kurs-2020.appspot.com",
  messagingSenderId: "944012044921",
  appId: "1:944012044921:web:42c24b12c6d931ef6642a8",
  measurementId: "G-LNPJWWN75X"
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

