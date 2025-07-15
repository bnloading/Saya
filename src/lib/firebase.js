import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5obZaBDamf-i1mBk5EjYEv5UsBkH9phU",
  authDomain: "comments-71032.firebaseapp.com",
  projectId: "comments-71032",
  storageBucket: "comments-71032.firebasestorage.app",
  messagingSenderId: "267433179205",
  appId: "1:267433179205:web:33b4495ca5321d7ae70b2c",
  measurementId: "G-1X48XERN3J",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Add this function to handle real-time comments subscription
export const subscribeToComments = (callback) => {
  const q = query(
    collection(db, "gallery-comments"),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });
};
