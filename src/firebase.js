// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmA1AUSS2u4MOemxaZz0t2zz3lScuUBcY",
  authDomain: "movie-trailer-app-19e77.firebaseapp.com",
  projectId: "movie-trailer-app-19e77",
  storageBucket: "movie-trailer-app-19e77.appspot.com",
  messagingSenderId: "391651097436",
  appId: "1:391651097436:web:b250185f65eea8193c5f99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);