import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "vedanta-53ef8.firebaseapp.com",
  projectId: "vedanta-53ef8",
  storageBucket: "vedanta-53ef8.appspot.com",
  messagingSenderId: "173615482197",
  appId: "1:173615482197:web:7d95f38f9ad59a9b785bdc",
  measurementId: "G-5XCGKBYC49"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);