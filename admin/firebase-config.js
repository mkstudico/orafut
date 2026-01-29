// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMzQe4_sHxVX2rgbgCF5E9DDWbbp9m7tc",
  authDomain: "orafut-58b5f.firebaseapp.com",
  projectId: "orafut-58b5f",
  storageBucket: "orafut-58b5f.firebasestorage.app",
  messagingSenderId: "500581059835",
  appId: "1:500581059835:web:7be0994b65ff21dae0b45e",
  measurementId: "G-WM3MV94G58"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const IMGBB_KEY = "99c6aa298645e8a4742979117fc73be6";

export { app, auth, db, analytics, IMGBB_KEY };
