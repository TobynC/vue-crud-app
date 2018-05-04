import firebase from 'firebase'
import firestore from 'firebase/firestore';
// Initialize Firebase
var config = {
apiKey: "AIzaSyBM9rjIgqJC6oHobrlzDuPQFQUMGLdfNys",
authDomain: "ninja-smoothie.firebaseapp.com",
databaseURL: "https://ninja-smoothie.firebaseio.com",
projectId: "ninja-smoothie",
storageBucket: "ninja-smoothie.appspot.com",
messagingSenderId: "634373339118"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();