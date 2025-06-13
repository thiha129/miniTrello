// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyBD8Pn28RpPMlJTF_JVkfDOcc1HaG22njA",
 authDomain: "mini-trell.firebaseapp.com",
 projectId: "mini-trell",
 storageBucket: "mini-trell.firebasestorage.app",
 messagingSenderId: "732973460038",
 appId: "1:732973460038:web:ea0ee39ac2edcbc96f3847",
 measurementId: "G-5M4JNWLLRZ"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
const db = getFirestore(app);

// Khởi tạo Realtime Database
const realtimeDb = getDatabase(app);

const auth = getAuth(app);

export { db, realtimeDb, auth };
