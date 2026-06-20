// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "crumbz-5edb8.firebaseapp.com",
  projectId: "crumbz-5edb8",
  storageBucket: "crumbz-5edb8.firebasestorage.app",
  messagingSenderId: "620363865035",
  appId: "1:620363865035:web:24f0c14150525ced4d744e",
  measurementId: "G-PYGRW3F77F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);