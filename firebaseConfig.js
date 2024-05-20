import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

// Configurasi Firebase JS SDK dari Console Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBUV8qUf18szh-9gePoLzsol3bSEqY5Pac",
    authDomain: "testfb-2-f3d2c.firebaseapp.com",
    projectId: "testfb-2-f3d2c",
    storageBucket: "testfb-2-f3d2c.appspot.com",
    messagingSenderId: "592650021821",
    appId: "1:592650021821:web:fb8b5e4eae1fbd72d4c0d4",
    measurementId: "G-29M3KBJTYE"
};

const app = initializeApp(firebaseConfig); // Inisiasi Penggunaan Firebase
const db = getFirestore(app); // Buat instance db untuk akses fungsi firestore

export { app, collection, addDoc, db, onSnapshot, deleteDoc, doc }