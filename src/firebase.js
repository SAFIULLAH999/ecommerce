// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB0N-iNRf-C8-uAhht6WDGv5RITebw8kP0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "e-commerce-b8f01.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "e-commerce-b8f01",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "e-commerce-b8f01.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "145772685143",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:145772685143:web:4087c46c70c20b5e40c012",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-W638WLCYNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export services for use in other files
export default app;
export { auth, db, analytics };
