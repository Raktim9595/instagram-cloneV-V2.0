import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5MKywWiBHbxobCqAn27ajR9kr87N7PDw",
  authDomain: "instagram-clone-edf03.firebaseapp.com",
  projectId: "instagram-clone-edf03",
  storageBucket: "instagram-clone-edf03.appspot.com",
  messagingSenderId: "855601930604",
  appId: "1:855601930604:web:8d97033491838f1d6e1349"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, storage, db };