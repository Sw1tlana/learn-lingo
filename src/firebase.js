import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app); 

export { app, database, auth, db };
