// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ_HXLYza8IkbWW8CgoSXNjoTGbBIBCtk",
  authDomain: "netflix-clone-9aee7.firebaseapp.com",
  projectId: "netflix-clone-9aee7",
  storageBucket: "netflix-clone-9aee7.appspot.com",
  messagingSenderId: "801675336600",
  appId: "1:801675336600:web:8d09a39ee7f4d3aa80a9ed",
  measurementId: "G-D0MWS9HPFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {app, db};