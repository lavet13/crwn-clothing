import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  DocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/categories/categories.types';
import { AdditionalInformation, UserData } from './fireabase.types';

const firebaseConfig = {
  apiKey: 'AIzaSyA_3-3-3c55IopVdGQxV2T1wj1f5_rcd_I',
  authDomain: 'crwn-clothing-db-b3a12.firebaseapp.com',
  projectId: 'crwn-clothing-db-b3a12',
  storageBucket: 'crwn-clothing-db-b3a12.appspot.com',
  messagingSenderId: '923265925632',
  appId: '1:923265925632:web:44bb0140b09333e6c18ee5',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

// Utilities functions are important because they minimize the impact that changing
// third party libraries have on our code base
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<DocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // console.log(userSnapshot.exists()); // verify if the doc exists(not the fields of the doc)
  // console.log(userSnapshot.data()); // getting data of the doc

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });

      return (await getDoc(userDocRef)) as DocumentSnapshot<UserData>;
    } catch (error: any) {
      console.log('error creating the user', error.message);
    }
  }

  return userSnapshot as DocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const getDataFromUserDocument = async (
  userAuth: User | null
): Promise<UserData | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = (await getDoc(userDocRef)) as DocumentSnapshot<UserData>;

  if (userSnapshot.exists()) return userSnapshot.data() as UserData;
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);

// convert an observable listener into a promise based function call
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      userAuth => {
        unsubscribe(); // if we don't unsub, there will be a memory leak meaning that listener is always active inside of our file
        resolve(userAuth);
      },
      reject
    );
  });
};
