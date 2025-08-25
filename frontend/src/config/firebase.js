import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACOwXFV7anJOqWXEtqviQ_Ad2Xuhb-hTA",
  authDomain: "startupekumid.firebaseapp.com",
  projectId: "startupekumid",
  storageBucket: "startupekumid.appspot.com",
  messagingSenderId: "534144006461",
  appId: "1:534144006461:web:4d88f5e294595405ebad54",
  measurementId: "G-VDNGXTTQ3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
