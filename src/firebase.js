// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCAHHjsg0bqgyqbC94IGaNUHjPW-LA4Yvs",
  authDomain: "heathcare-web-c6155.firebaseapp.com",
  projectId: "heathcare-web-c6155",
  storageBucket: "heathcare-web-c6155.appspot.com",
  messagingSenderId: "418326579726",
  appId: "1:418326579726:web:e12e83df8d300f04d28a5f",
  measurementId: "G-CGY7H5KSQ6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
