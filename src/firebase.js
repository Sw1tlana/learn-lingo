import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth/cordova";

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "teachersapp-72029.firebaseapp.com",
  projectId: "teachersapp-72029",
  storageBucket: "teachersapp-72029.appspot.com",
  messagingSenderId: "937593556807",
  appId: "1:937593556807:web:b268cace3158c223810662",
  measurementId: "G-QMZ63N4XYR"
};

const app = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();

