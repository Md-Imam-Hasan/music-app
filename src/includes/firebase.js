import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAs9CeTK1ftQE32GzFPopxuwHyei6jjX8M',
  authDomain: 'music-2d34d.firebaseapp.com',
  projectId: 'music-2d34d',
  storageBucket: 'music-2d34d.appspot.com',
  messagingSenderId: '531572320579',
  appId: '1:531572320579:web:1df7b4360f862b78b9a7f6',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export {
  db,
  doc,
  setDoc,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
