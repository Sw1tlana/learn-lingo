
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB4KC97q9NwQ8eo_G0INEcumuG8bGo6hhk",
  authDomain: "teachersapp-72029.firebaseapp.com",
  projectId: "teachersapp-72029",
  storageBucket: "teachersapp-72029.appspot.com",
  messagingSenderId: "937593556807",
  appId: "1:937593556807:web:b268cace3158c223810662",
  measurementId: "G-QMZ63N4XYR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const database = getDatabase(app);

export {
    auth, 
    database,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    ref,
    set,
    get,
    child
};