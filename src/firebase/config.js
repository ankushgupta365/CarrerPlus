import app from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6QM7KIu5O1GBEXQFX4cEJUCn2A6AsuPU",
  authDomain: "job-listing-4ab0e.firebaseapp.com",
  projectId: "job-listing-4ab0e",
  storageBucket: "job-listing-4ab0e.appspot.com",
  messagingSenderId: "404904291924",
  appId: "1:404904291924:web:edd0607aa676c18dd007c1"
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app };
