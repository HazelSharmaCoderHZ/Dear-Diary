// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpRM4u6eplDT768_33kffpeavBbsWZetI",
  authDomain: "dear-diary-7d051.firebaseapp.com",
  projectId: "dear-diary-7d051",
  storageBucket: "dear-diary-7d051.firebasestorage.app",
  messagingSenderId: "830690134222",
  appId: "1:830690134222:web:c87ea5e73c36936c27289f",
  measurementId: "G-FRNK9KCRM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};