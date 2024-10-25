import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyCKNMUs8f1ZB_trlTaEJqCrd0i0w6ek4oo",
    authDomain: "teachersapp-dd91b.firebaseapp.com",
    projectId: "teachersapp-dd91b",
    storageBucket: "teachersapp-dd91b.appspot.com",
    messagingSenderId: "165416372744",
    appId: "1:165416372744:web:bf5ca8acead8649ad41fbd"
    
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
