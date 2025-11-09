import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAojY8_KCq8LmDc4XWA3Ig9dhI_e0jHrDw",
  authDomain: "careerplatform-4a8b4.firebaseapp.com",
  projectId: "careerplatform-4a8b4",
  storageBucket: "careerplatform-4a8b4.firebasestorage.app",
  messagingSenderId: "1040649329559",
  appId: "1:1040649329559:web:bef3bb97bca701b14f42d2",
  measurementId: "G-6FVQ27K267"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;