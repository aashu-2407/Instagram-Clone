import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAblRKPRRpOw8OQRRW_5lNhiY6XpkrQ3cc",
    authDomain: "instagram-clone-ab4f7.firebaseapp.com",
    databaseURL: "https://instagram-clone-ab4f7.firebaseio.com",
    projectId: "instagram-clone-ab4f7",
    storageBucket: "instagram-clone-ab4f7.appspot.com",
    messagingSenderId: "212837557434",
    appId: "1:212837557434:web:b02c8cabab7d1927144e83"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

// https://instagram-clone-ab4f7.web.app/ -----firebase final app deployed URL