import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZr5MylBdw8LiHmI2M5a8MA7x9LF6vtlE",
  authDomain: "masmax-6310b.firebaseapp.com",
  projectId: "masmax-6310b",
  storageBucket: "masmax-6310b.appspot.com",
  messagingSenderId: "247156451959",
  appId: "1:247156451959:web:4f86c7e628384104c37472",
  measurementId: "G-THV85GJ2J7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
