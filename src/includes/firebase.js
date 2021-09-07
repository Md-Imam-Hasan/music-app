import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  // eslint-disable-next-line comma-dangle
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  // eslint-disable-next-line comma-dangle
  where
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage, ref,
  // eslint-disable-next-line comma-dangle
  uploadBytesResumable
} from 'firebase/storage';

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
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const storage = getStorage(firebaseApp);

export {
  db,
  doc,
  ref,
  setDoc,
  auth,
  getDoc,
  orderBy,
  limit,
  startAfter,
  storage,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  deleteObject,
  addDoc,
  collection,
  uploadBytesResumable,
  getDownloadURL,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
