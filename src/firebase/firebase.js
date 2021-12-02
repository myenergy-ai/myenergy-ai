import { intializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDwdhDjiuh6eMH4fBmxczaPs38DGNPlQaw",
  authDomain: "myenergy-ai-prod.firebaseapp.com",
  projectId: "myenergy-ai-prod",
  storageBucket: "myenergy-ai-prod.appspot.com",
  messagingSenderId: "991456346299",
  appId: "1:991456346299:web:c69d48ff7d46a913f5299e",
  measurementId: "G-Y5GXJP7NTG",
};

const app = initializeApp(firebaseConfig);

export default app;
