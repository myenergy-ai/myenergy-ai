import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUkHKquqH4Y_oynHTdtECTFm97xTNmy8Y",
  authDomain: "myenergy-ai.firebaseapp.com",
  projectId: "myenergy-ai",
  storageBucket: "myenergy-ai.appspot.com",
  messagingSenderId: "523493172739",
  appId: "1:523493172739:web:d19efcc9b4001ab1209036",
  measurementId: "G-CR55F2SY1W",
};

firebase.initializeApp(firebaseConfig);
