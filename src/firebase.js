// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb3FdV0HAkZbomDXlK16chWVibMhr0EOw",
  authDomain: "problem-solution-website.firebaseapp.com",
  projectId: "problem-solution-website",
  storageBucket: "problem-solution-website.appspot.com",
  messagingSenderId: "498360885198",
  appId: "1:498360885198:web:662067c670c2e0dd40959f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);