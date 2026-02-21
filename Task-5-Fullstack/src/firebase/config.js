import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

     apiKey: "AIzaSyCXWRY78i4QnAQTQmBHwA335ygRMS1vLe8",
    authDomain: "taskmanager2-13aba.firebaseapp.com",
    projectId: "taskmanager2-13aba",
    storageBucket: "taskmanager2-13aba.firebasestorage.app",
    messagingSenderId: "137670858085",
    appId: "1:137670858085:web:94f3e1c7317ce06d19fd8c"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

