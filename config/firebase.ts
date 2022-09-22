import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ8V4JEW6pKFpcFMhHaZOFHPZ4vThOb6s",
  authDomain: "fakebook-754bb.firebaseapp.com",
  projectId: "fakebook-754bb",
  storageBucket: "fakebook-754bb.appspot.com",
  messagingSenderId: "11142887335",
  appId: "1:11142887335:web:7802792fed63898cbd6882",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
