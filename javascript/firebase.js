import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "crumbz-c6eb9.firebaseapp.com",
  projectId: "crumbz-c6eb9",
  storageBucket: "crumbz-c6eb9.firebasestorage.app",
  messagingSenderId: "610339390195",
  appId: "1:610339390195:web:c157672c4e58eaa7942d86",
  measurementId: "G-FRG3Z5110B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);