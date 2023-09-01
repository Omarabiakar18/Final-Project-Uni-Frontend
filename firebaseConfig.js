import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBe5Emeo4F6c_9Ab-Vb792baRopqNyU1mY",
  authDomain: "bookshelf-depot-4594f.firebaseapp.com",
  projectId: "bookshelf-depot-4594f",
  storageBucket: "bookshelf-depot-4594f.appspot.com",
  messagingSenderId: "734670116501",
  appId: "1:734670116501:web:08b3937077a12b4073ad9c",
  measurementId: "G-3GPR59782X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
