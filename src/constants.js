// import Rebase from 're-base';
// import firebase from 'firebase';

// const app = firebase.initializeApp({
    // apiKey: "AIzaSyAaawZkDsLoUrs-gZUUzYvqmRLTIbWmlIU",
    // authDomain: "poke-binder.firebaseapp.com",
    // databaseURL: "https://poke-binder.firebaseio.com",
    // projectId: "poke-binder",
    // storageBucket: "poke-binder.appspot.com",
    // messagingSenderId: "1024359769872"
// });



// // //add the authProvides your app needs: google, facebook, twitter, github,
// export const googleProvider = new firebase.auth.GoogleAuthProvider();

// export const rebase = Rebase.createClass(app.database());



// import Rebase from 're-base';
// import firebase from 'firebase/app';
// import 'firebase/database';

// var app = firebase.initializeApp({
    // apiKey: "AIzaSyAaawZkDsLoUrs-gZUUzYvqmRLTIbWmlIU",
    // authDomain: "poke-binder.firebaseapp.com",
    // databaseURL: "https://poke-binder.firebaseio.com",
    // projectId: "poke-binder",
    // storageBucket: "poke-binder.appspot.com",
    // messagingSenderId: "1024359769872"
// });

// var db = firebase.database(app);
// var rebase = Rebase.createClass(db);

// export default rebase;


import Rebase from 're-base';
import firebase from 'firebase/app';
import database from 'firebase/database';
import auth from 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAaawZkDsLoUrs-gZUUzYvqmRLTIbWmlIU",
    authDomain: "poke-binder.firebaseapp.com",
    databaseURL: "https://poke-binder.firebaseio.com",
    projectId: "poke-binder",
    storageBucket: "poke-binder.appspot.com",
    messagingSenderId: "1024359769872"
});
const db = firebase.database(app);
const rebase = Rebase.createClass(db);
console.log("what is firebase", app)
const googleProvider = new firebase.auth.GoogleAuthProvider();
export {rebase, app, googleProvider};