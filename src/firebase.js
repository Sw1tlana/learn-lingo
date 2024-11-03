import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; 
const API_KEY = import.meta.env.VITE_API_KEY;
const API_AUTH_DOMAIN = import.meta.env.API_AUTH_DOMAIN;
const API_PROJECT_ID = import.meta.env.API_PROJECT_ID;
const API_STORADGE_BUCKET = import.meta.env.API_STORADGE_BUCKET;
const API_MESSAGING_SENDER_ID = import.meta.env.API_MESSAGING_SENDER_ID;
const API_APP_ID = import.meta.env.API_APP_ID;
const API_DATABASE_URL = import.meta.env.API_DATABASE_URL;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: API_AUTH_DOMAIN,
    projectId: API_PROJECT_ID,
    storageBucket: API_STORADGE_BUCKET,
    messagingSenderId: API_MESSAGING_SENDER_ID,
    appId: API_APP_ID,
    databaseURL: API_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
