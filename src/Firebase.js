import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6qEvawwRZBAXh4wKMmvj5bA8jaqdPzYY",
  authDomain: "tvf-calendar.firebaseapp.com",
  databaseURL: "https://tvf-calendar.firebaseio.com",
  projectId: "tvf-calendar",
  storageBucket: "",
  messagingSenderId: "1052781319998",
  appId: "1:1052781319998:web:e9ad8abc94c6ddb5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebasePosts = firebaseDB.ref('posts')

export {
    firebase,
    firebasePosts
}
