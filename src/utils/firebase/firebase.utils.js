import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA_3-3-3c55IopVdGQxV2T1wj1f5_rcd_I',
  authDomain: 'crwn-clothing-db-b3a12.firebaseapp.com',
  projectId: 'crwn-clothing-db-b3a12',
  storageBucket: 'crwn-clothing-db-b3a12.appspot.com',
  messagingSenderId: '923265925632',
  appId: '1:923265925632:web:44bb0140b09333e6c18ee5',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
