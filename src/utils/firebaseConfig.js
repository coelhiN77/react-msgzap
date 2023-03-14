import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../firebaseConfig.json";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const databaseApp = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, databaseApp, auth };
