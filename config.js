import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEKtOP6qHXEFct04xNW3XHQ0QYM-ZJpwI",
  authDomain: "pourapp-c2b3e.firebaseapp.com",
  projectId: "pourapp-c2b3e",
  storageBucket: "pourapp-c2b3e.appspot.com",
  messagingSenderId: "1068020856911",
  appId: "1:1068020856911:web:272c194b195fefee1d123a",
  measurementId: "G-6JW8T4S69Y"
};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  export {firebase}