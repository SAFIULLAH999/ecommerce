// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0N-iNRf-C8-uAhht6WDGv5RITebw8kP0",
  authDomain: "e-commerce-b8f01.firebaseapp.com",
  projectId: "e-commerce-b8f01",
  storageBucket: "e-commerce-b8f01.firebasestorage.app",
  messagingSenderId: "145772685143",
  appId: "1:145772685143:web:4087c46c70c20b5e40c012",
  measurementId: "G-W638WLCYNY"
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
