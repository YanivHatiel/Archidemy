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

// Enhanced session management
const setSessionCookie = async (user) => {
    try {
        const idToken = await user.getIdToken(true);
        console.log("ID token acquired, length:", idToken.length);

        const response = await fetch("/sessionLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({ idToken })
        });

        console.log("Session login response status:", response.status);
        console.log("Session login response headers:", Object.fromEntries(response.headers));

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Session login failed: ${JSON.stringify(errorData)}`);
        }

        // Verify cookie was set
        const cookies = document.cookie.split(';').map(c => c.trim());
        console.log("Current cookies:", cookies);
        
        return true;
    } catch (error) {
        console.error("Session cookie setting failed:", error);
        throw error;
    }
};

// Enhanced login function
async function loginStudent(event) {
    event.preventDefault();
    console.log("Enhanced login process started");
    
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value.trim();
    const errorElement = document.getElementById("loginError");
    if (errorElement) errorElement.textContent = "";
    
    try {
        console.log("Attempting Firebase authentication...");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Firebase authentication successful for user:", user.uid);

        if (!user.emailVerified) {
            throw new Error("Please verify your email before signing in.");
        }

        console.log("Setting session cookie...");
        await setSessionCookie(user);
        console.log("Session cookie set successfully");

        // Verify authentication state
        const currentUser = auth.currentUser;
        console.log("Current user state:", currentUser ? "Authenticated" : "Not authenticated");

        console.log("Redirecting to home page...");
        window.location.href = window.location.origin + "/archidemy/";
    } catch (error) {
        handleError(error, errorElement);
    }
}

// Enhanced logout function
async function logoutStudent() {
    try {
        // Clear session cookie first
        await fetch("/sessionLogout", {
            method: "POST",
            credentials: "same-origin"
        });
        
        // Then sign out from Firebase
        await signOut(auth);
        console.log("Logout successful, session cleared");
        
        window.location.href = window.location.origin + "/archidemy/";
    } catch (error) {
        console.error("Logout error:", error);
        alert("Error during logout: " + error.message);
    }
}

// Enhanced auth state observer
const initializeAuthObserver = () => {
    onAuthStateChanged(auth, async (user) => {
        console.log("Auth state changed:", user ? "User signed in" : "User signed out");
        
        const userEmail = document.getElementById("userEmail");
        const signInLink = document.getElementById("signInLink");
        const logoutLink = document.getElementById("logoutLink");
        
        if (user) {
            console.log("User authenticated:", user.email);
            if (userEmail) userEmail.textContent = user.email;
            if (signInLink) signInLink.style.display = "none";
            if (logoutLink) logoutLink.style.display = "block";
            
            // Verify session cookie on auth state change
            try {
                const response = await fetch("/checkSession", {
                    credentials: "same-origin"
                });
                if (!response.ok) {
                    console.log("Session cookie not found, attempting to set...");
                    await setSessionCookie(user);
                }
            } catch (error) {
                console.error("Session verification failed:", error);
            }
        } else {
            console.log("User signed out");
            if (userEmail) userEmail.textContent = "";
            if (signInLink) signInLink.style.display = "block";
            if (logoutLink) logoutLink.style.display = "none";
        }
    });
};

// Initialize auth observer when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeAuthObserver);

// Register student function remains the same
// ... (your existing registerStudent function)

// Export functions to window object
window.registerStudent = registerStudent;
window.loginStudent = loginStudent;
window.logoutStudent = logoutStudent;