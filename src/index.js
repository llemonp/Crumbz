import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// keep apiKey hidden so data is secure
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "crumbz-c6eb9.firebaseapp.com",
    projectId: "crumbz-c6eb9",
    storageBucket: "crumbz-c6eb9.firebasestorage.app",
    messagingSenderId: "610339390195",
    appId: "1:610339390195:web:c157672c4e58eaa7942d86",
    measurementId: "G-FRG3Z5110B"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// current auth state or whether a user is logged in or not
onAuthStateChanged(auth, user => {
  if (user){
    console.log('logged in', user.uid);
  } else {
    console.log('no user');
  }
});