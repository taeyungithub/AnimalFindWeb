// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API,
  authDomain: process.env.NEXT_PUBLIC_B,
  projectId: process.env.NEXT_PUBLIC_C,
  storageBucket: process.env.NEXT_PUBLIC_D,
  messagingSenderId: process.env.NEXT_PUBLIC_E,
  appId: process.env.NEXT_PUBLIC_F,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebasestorage = getStorage(firebaseApp);

