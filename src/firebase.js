import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_YOUR_API_KEY,
  authDomain: process.env.REACT_APP_YOUR_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_YOUR_PROJECT_ID,
  storageBucket: process.env.REACT_APP_YOUR_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_YOUR_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_YOUR_APP_ID,
  measurementId: process.env.REACT_APP_YOUR_MEASURMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, analytics, db };
export default app;
