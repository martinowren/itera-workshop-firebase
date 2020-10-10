import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'someKey',
  authDomain: 'yourApp.firebaseapp.com',
  databaseURL: 'https://yourApp.firebaseio.com',
  projectId: 'yourApp',
  storageBucket: 'yourApp.appspot.com',
  messagingSenderId: 'someId',
  appId: 'someId',
  measurementId: 'someId',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
