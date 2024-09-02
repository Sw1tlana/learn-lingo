import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider };