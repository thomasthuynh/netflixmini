// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmtPERFbL4C_m9zGKNWFIV7u2fDJII5Z0",
  authDomain: "miniflix-557d7.firebaseapp.com",
  projectId: "miniflix-557d7",
  storageBucket: "miniflix-557d7.appspot.com",
  messagingSenderId: "150346486955",
  appId: "1:150346486955:web:3f5aba3882fe81bebed3ee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);