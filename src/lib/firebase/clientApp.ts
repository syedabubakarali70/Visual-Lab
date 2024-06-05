// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3YbEVbu_fzRLFeNQQ0yZ9CaQNcdozVQ0",
  authDomain: "visual-lab-86ae5.firebaseapp.com",
  projectId: "visual-lab-86ae5",
  storageBucket: "visual-lab-86ae5.appspot.com",
  messagingSenderId: "61605063156",
  appId: "1:61605063156:web:fa9371c3bdf032804971a1",
  measurementId: "G-4J4RVZC3W0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

export {app,auth,db}