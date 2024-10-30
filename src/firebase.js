import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; 
const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "teachersapp-dd91b.firebaseapp.com",
    projectId: "teachersapp-dd91b",
    storageBucket: "teachersapp-dd91b.appspot.com",
    messagingSenderId: "165416372744",
    appId: "1:165416372744:web:bf5ca8acead8649ad41fbd",
    databaseURL: "https://teachersapp-dd91b-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
