// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNnLEFvspp1XIX1b23lVtxuVyWuP-ZwE0",
  authDomain: "unit-test-social-app.firebaseapp.com",
  projectId: "unit-test-social-app",
  storageBucket: "unit-test-social-app.appspot.com",
  messagingSenderId: "697896932696",
  appId: "1:697896932696:web:95e7b44b67bdbc6df4012d",
  measurementId: "G-VH484KL6J1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
