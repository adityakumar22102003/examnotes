
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDd-f6AYcX_BmjZinqba-7CUg0QIilwQNE",
    authDomain: "authexamnotes-745bb.firebaseapp.com",
    projectId: "authexamnotes-745bb",
    storageBucket: "authexamnotes-745bb.firebasestorage.app",
    messagingSenderId: "701483308577",
    appId: "1:701483308577:web:576e926536e674e0987560"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}