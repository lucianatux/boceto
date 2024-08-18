// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "vedanta-53ef8.firebaseapp.com",
  projectId: "vedanta-53ef8",
  storageBucket: "vedanta-53ef8.appspot.com",
  messagingSenderId: "173615482197",
  appId: "1:173615482197:web:7d95f38f9ad59a9b785bdc",
  measurementId: "G-5XCGKBYC49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();