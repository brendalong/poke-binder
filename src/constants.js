import Rebase from 're-base';
import firebase from 'firebase';
const app = firebase.initializeApp({
    apiKey: "AIzaSyCkR-p-cRKN4Lo-SBVlDBnAaMay-yqni8w",
    authDomain: "bell-pokemon.firebaseapp.com",
    databaseURL: "https://bell-pokemon.firebaseio.com"
});

export const rebase = Rebase.createClass(app.database());

// //add the authProvides your app needs: google, facebook, twitter, github,
//export const googleProvider = new firebase.auth.GoogleAuthProvider();