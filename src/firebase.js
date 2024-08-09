// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCqI2X7HtdCeiMB3f6yiQdGaqC6AxFqHrQ",
  authDomain: "task-manager-1f569.firebaseapp.com",
  projectId: "task-manager-1f569",
  storageBucket: "task-manager-1f569.appspot.com",
  messagingSenderId: "699132642078",
  appId: "1:699132642078:web:196246e2def57bcd60bf0f",
  measurementId: "G-TTHY6MKW9X"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth =  getAuth();
export default db ;