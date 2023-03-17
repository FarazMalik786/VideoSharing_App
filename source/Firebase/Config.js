// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC2J11pJr6NU-p3SKeioHytcbE9VKPKoM",
  authDomain: "tiktok-clone-4d0f6.firebaseapp.com",
  projectId: "tiktok-clone-4d0f6",
  storageBucket: "tiktok-clone-4d0f6.appspot.com",
  messagingSenderId: "1024826012977",
  appId: "1:1024826012977:web:4763936d3fd84fc4bd2c10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
