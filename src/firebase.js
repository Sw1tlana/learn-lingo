import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
 
  authDomain: "teachersapp-f3d77.firebaseapp.com",
  databaseURL: "https://teachersapp-f3d77-default-rtdb.firebaseio.com",
  projectId: "teachersapp-f3d77",
  storageBucket: "teachersapp-f3d77.appspot.com",
  messagingSenderId: "796592860576",
  appId: "1:796592860576:web:be740af958e8abb54848c5"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };