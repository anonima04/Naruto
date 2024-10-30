// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM53WDgddON91dPxJtPQjYJ0gzjbpbdSM",
  authDomain: "naruto-74d55.firebaseapp.com",
  projectId: "naruto-74d55",
  storageBucket: "naruto-74d55.appspot.com",
  messagingSenderId: "179179625925",
  appId: "1:179179625925:web:4f977eadbd5a1343adffac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Inicializa Firestore
const db = getFirestore(app);

export { db };