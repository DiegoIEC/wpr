import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAHM21kJ639oFpEl6v7MJOR4nyQKSfJa1s",
  authDomain: "chat-accesibility.firebaseapp.com",
  databaseURL: "https://chat-accesibility-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-accesibility",
  storageBucket: "chat-accesibility.appspot.com",
  messagingSenderId: "533014645221",
  appId: "1:533014645221:web:7708cb2377e29bae66c70c",
  measurementId: "G-PTCKH2EKZX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authInstance = getAuth(app);
const databaseInstance = getDatabase(app);

export { analytics, authInstance as auth, databaseInstance as database, firebaseConfig as default };
