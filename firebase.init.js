// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhkxwfPm-wcvw88pIh9-kxgnrZMRZkgt0",
  authDomain: "query-hunt.firebaseapp.com",
  projectId: "query-hunt",
  storageBucket: "query-hunt.firebasestorage.app",
  messagingSenderId: "815252427523",
  appId: "1:815252427523:web:2ff9f71af5a41794508f36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);