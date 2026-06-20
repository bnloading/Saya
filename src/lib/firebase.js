import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5obZaBDamf-i1mBk5EjYEv5UsBkH9phU",
  authDomain: "comments-71032.firebaseapp.com",
  databaseURL: "https://comments-71032-default-rtdb.firebaseio.com",
  projectId: "comments-71032",
  storageBucket: "comments-71032.firebasestorage.app",
  messagingSenderId: "267433179205",
  appId: "1:267433179205:web:33b4495ca5321d7ae70b2c",
  measurementId: "G-1X48XERN3J",
};

const app = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(app);
export let analytics = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

export const subscribeToComments = (callback) => {
  const commentsQuery = query(
    ref(realtimeDb, "gallery-comments"),
    orderByChild("timestamp"),
  );

  return onValue(commentsQuery, (snapshot) => {
    const comments = Object.entries(snapshot.val() ?? {})
      .map(([id, value]) => ({
        id,
        ...value,
      }))
      .sort(
        (first, second) => (second.timestamp ?? 0) - (first.timestamp ?? 0),
      );
    callback(comments);
  });
};
