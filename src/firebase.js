import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCJ6ZmpU-WlBKHNjUJF_IEqM33Jl0q8XQ",
  authDomain: "kilo-app-179b1.firebaseapp.com",
  projectId: "kilo-app-179b1",
  storageBucket: "kilo-app-179b1.firebasestorage.app",
  messagingSenderId: "226057366216",
  appId: "1:226057366216:web:9cc338090fef4691c8d3fd",
  measurementId: "G-QW15CFLLW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export default db;