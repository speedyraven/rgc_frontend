import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB1EyRbG7XKnu0jwYDjeI8I8zSA5jUCq4Y",
  authDomain: "rgc-mwihoko-2-8fbbc.firebaseapp.com",
  databaseURL: "https://rgc-mwihoko-2-8fbbc-default-rtdb.firebaseio.com",
  projectId: "rgc-mwihoko-2-8fbbc",
  storageBucket: "rgc-mwihoko-2-8fbbc.firebasestorage.app",
  messagingSenderId: "852437220763",
  appId: "1:852437220763:web:e808726545be3c4ee8753e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);