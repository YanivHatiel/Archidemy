// auth.js - Enhanced version with session cookie handling and debugging
console.log("Enhanced auth.js loaded");

import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCQxd5pLTVatx9ppwK_R7C8nMfKWl7JKSU",
    authDomain: "architoolacademy.firebaseapp.com",
    projectId: "architoolacademy",
    storageBucket: "architoolacademy.firebasestorage.app",
    messagingSenderId: "981482256629",
    appId: "1:981482256629:web:bbf3fed957f51cfb2cadbc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enhanced error handling utility
const handleError = (error, errorElement) => {
    console.error("Error details:", error);
    let friendlyMessage = error.message;
    
    if (error.code) {
        switch (error.code) {
            case "auth/wrong-password":
                friendlyMessage = "The password is incorrect. Please try again.";
                break;
            case "auth/user-not-found":
                friendlyMessage = "No account found with that email address.";
                break;
            case "auth/invalid-email":
                friendlyMessage = "The email address is not valid.";
                break;
            case "auth/invalid-credential":
                friendlyMessage = "The credentials provided are invalid. Please check your email and password.";
                break;
            default:
                friendlyMessage = error.message;
        }
    }
    
    if (errorElement) {
        errorElement.textContent = friendlyMessage;
    } else {
        alert(friendlyMessage);
    }
};

// Initialize auth observer when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeAuthObserver);

// Register student function remains the same
// ... (your existing registerStudent function)

// Export functions to window object
window.registerStudent = registerStudent;
window.loginStudent = loginStudent;
window.logoutStudent = logoutStudent;