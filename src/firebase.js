// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 
  authDomain: "teachersapp-f3d77.firebaseapp.com",
  databaseURL: "https://teachersapp-f3d77-default-rtdb.firebaseio.com",
  projectId: "teachersapp-f3d77",
  storageBucket: "teachersapp-f3d77.appspot.com",
  messagingSenderId: "796592860576",
  appId: "1:796592860576:web:be740af958e8abb54848c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);