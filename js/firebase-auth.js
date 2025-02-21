// Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCQxd5pLTVatx9ppwK_R7C8nMfKWl7JKSU",
  authDomain: "architoolacademy.firebaseapp.com",
  projectId: "architoolacademy",
  storageBucket: "architoolacademy.firebasestorage.app",
  messagingSenderId: "981482256629",
  appId: "1:981482256629:web:bbf3fed957f51cfb2cadbc"
  
};

// Namespaced approach for Firebase v9+:
firebase.initializeApp(firebaseConfig);

const auth = firebase.getAuth();
const db = firebase.getFirestore();
