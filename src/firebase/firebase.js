import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { get } from "firebase/database";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCad7GnqXgEpSSP6Od_jdvNZ-ZoXhjPRgk",
  authDomain: "finalproj-connectify.firebaseapp.com",
  projectId: "finalproj-connectify",
  storageBucket: "finalproj-connectify.appspot.com",
  messagingSenderId: "95718897270",
  appId: "1:95718897270:web:5801075feac037bf2cd157",
  measurementId: "G-E2NL3FT76X",
  databaseURL:"https://finalproj-connectify-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore()

export const database = getDatabase(app);