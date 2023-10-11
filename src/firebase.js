import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLzMDDfd1hTNvat7-q3TuLfz0iRs5nFlw",
  authDomain: "final-bus-traking.firebaseapp.com",
  databaseURL: "https://final-bus-traking-default-rtdb.firebaseio.com",
  projectId: "final-bus-traking",
  storageBucket: "final-bus-traking.appspot.com",
  messagingSenderId: "672447756097",
  appId: "1:672447756097:web:049420c8c40ea3940d53c0",
  measurementId: "G-9N0BE3D56N"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
