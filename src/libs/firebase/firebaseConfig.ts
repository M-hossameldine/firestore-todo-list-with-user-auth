import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASU6NuiPMhVFm3tPvxJ2wRkld_JfP_nTI",
  authDomain: "fir-9-auth-5b31f.firebaseapp.com",
  projectId: "fir-9-auth-5b31f",
  storageBucket: "fir-9-auth-5b31f.firebasestorage.app",
  messagingSenderId: "530020238026",
  appId: "1:530020238026:web:897ab3701de41407966a33",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default firebaseApp;

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
};
