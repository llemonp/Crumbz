import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

// expose to main.js (which uses onclick= and can't use imports)
window.db = db;
window.fsCollection = collection;
window.fsAddDoc = addDoc;
window.fsTimestamp = serverTimestamp;