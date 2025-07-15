import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDN_HPzbKc_eLjbCEqoLuzGECbYoFhuOwk",
  authDomain: "saya-24ec4.firebaseapp.com",
  projectId: "saya-24ec4",
  storageBucket: "saya-24ec4.firebasestorage.app",
  messagingSenderId: "864275314522",
  appId: "1:864275314522:web:2941818dbd6a9cd7506563",
  measurementId: "G-YLK41QNRWW",
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
