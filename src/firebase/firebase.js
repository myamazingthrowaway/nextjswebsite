import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDfWHy5IgI2f16Wym9OGVoVPs9gdPHXZmA",
  authDomain: "nextjswebsite.firebaseapp.com",
  databaseURL: "https://nextjswebsite.firebaseio.com",
  projectId: "nextjswebsite",
  storageBucket: "nextjswebsite.appspot.com",
  messagingSenderId: "82297193029",
  appId: "1:82297193029:web:5a8a428aa6fd836761192c",
  measurementId: "G-MVGDNLRHYW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/plus.login");

export { db, auth, provider };
