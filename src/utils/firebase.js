// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9576Atb5DM8breuNOsNQxwVS58o3yigE",
  authDomain: "streamifygpt-f6400.firebaseapp.com",
  projectId: "streamifygpt-f6400",
  storageBucket: "streamifygpt-f6400.appspot.com",
  messagingSenderId: "679194478039",
  appId: "1:679194478039:web:f2cc7e767d91e77064f792",
  measurementId: "G-JLN0CVLREN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();