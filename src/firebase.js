import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC1qoXMiYzJQUYaRV4fhnI4WgMFeS4dHC0",
    authDomain: "ride-my-bike.firebaseapp.com",
    databaseURL: "https://ride-my-bike.firebaseio.com",
    projectId: "ride-my-bike",
    storageBucket: "ride-my-bike.appspot.com",
    messagingSenderId: "101665155138",
    appId: "1:101665155138:web:6544bd2903781a306fa5db"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
