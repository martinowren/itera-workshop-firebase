import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyAT_kOYIgMGlBED937cPO3eOsMNSXLkRtw',
	authDomain: 'cardsangainstdevs.firebaseapp.com',
	databaseURL: 'https://cardsangainstdevs.firebaseio.com',
	projectId: 'cardsangainstdevs',
	storageBucket: 'cardsangainstdevs.appspot.com',
	messagingSenderId: '32284126021',
	appId: '1:32284126021:web:692ea6f5c3d7206cd36c2c',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
