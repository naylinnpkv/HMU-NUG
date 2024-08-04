// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm-sP04NKlLlOoOQQm5S58JeXQLAfCpZg",
  authDomain: "mhu-raffle.firebaseapp.com",
  projectId: "mhu-raffle",
  storageBucket: "mhu-raffle.appspot.com",
  messagingSenderId: "905850930031",
  appId: "1:905850930031:web:21464f152bcdbe1eefde9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    // console.log("User signed in: ", user);
    // You can now use the user's info to add tickets, etc.
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  const signInButton = document.getElementById("google-sign-in-btn");

  if (signInButton) {
    signInButton.addEventListener("click", signInWithGoogle);
  } else {
    console.error("Sign-in button not found");
  }
});

export { auth, provider, signInWithGoogle, db };
