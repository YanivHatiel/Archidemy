// ? Always Initialize Firebase First!
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCQxd5pLTVatx9ppwK_R7C8nMfKWl7JKSU",
      authDomain: "architoolacademy.firebaseapp.com",
      projectId: "architoolacademy",
      storageBucket: "architoolacademy.firebasestorage.app",
      messagingSenderId: "981482256629",
      appId: "1:981482256629:web:bbf3fed957f51cfb2cadbc"
    };

// ? Initialize Firebase
const app = initializeApp(firebaseConfig);

// ? Ensure Firebase is Ready Before Calling Anything Else
const auth = getAuth(app);
const db = getFirestore(app);

console.log("? Firebase Initialized Successfully!");
