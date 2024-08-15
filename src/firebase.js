// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDqBFnQglSAlV9O6AUGm0sPgUOE46oLZdY",
  authDomain: "taskmanager-72f9e.firebaseapp.com",
  projectId: "taskmanager-72f9e",
  storageBucket: "taskmanager-72f9e.appspot.com",
  messagingSenderId: "987234417762",
  appId: "1:987234417762:web:89f5ed0f76792d21ae253b",
  measurementId: "G-5ZGCR5E4RW"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth =  getAuth(app);
export {auth , provider}
export default db ;