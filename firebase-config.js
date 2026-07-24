// Firebase SDK for browser
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWhujpz34s707mdQiC-YrLkgc7qAVKQ_I",
  authDomain: "maryam-memorial-institute.firebaseapp.com",
  projectId: "maryam-memorial-institute",
  storageBucket: "maryam-memorial-institute.firebasestorage.app",
  messagingSenderId: "808006642803",
  appId: "1:808006642803:web:0af5a648a7859eff554e06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Firestore Database
const db = getFirestore(app);

// Export
export { auth, db };