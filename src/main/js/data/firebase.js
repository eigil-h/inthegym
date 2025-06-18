import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  signInAnonymously,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  signOut as fbSignOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(Constants.expoConfig.web.config.firebase);
const db = getFirestore(app);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

// Helper to format Firebase error messages
const getErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'permission-denied':
      return 'You don\'t have permission to perform this action.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

export const signInAnon = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error('Error logging in anonymously:', error);
    throw new Error(getErrorMessage(error));
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await fbSignInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error logging in with email and password:', error);
    throw new Error(getErrorMessage(error));
  }
};

export const signOut = async () => {
  try {
    await fbSignOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error(getErrorMessage(error));
  }
};

export const registerAuthStateChangeHandler = (handler) => {
  return auth.onAuthStateChanged(handler);
};

const loadHome = async (userId, setter) => {
  try {
    const workoutSnap = await getDocs(collection(db, `user/${userId}/workout`));
    const docs = {};
    workoutSnap.forEach((doc_) => {
      docs[doc_.id] = doc_.data()?.exercises;
    });
    setter(docs);
  } catch (error) {
    console.error('Error loading workouts:', error);
    throw new Error(getErrorMessage(error));
  }
};

export const updateWorkout = async (userId, name, data) => {
  try {
    await setDoc(doc(db, `user/${userId}/workout`, name), data);
  } catch (error) {
    console.error('Error updating workout:', error);
    throw new Error(getErrorMessage(error));
  }
};

export const deleteWorkout = async (userId, name) => {
  try {
    await deleteDoc(doc(db, `user/${userId}/workout`, name));
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw new Error(getErrorMessage(error));
  }
};

// eslint-disable-next-line no-unused-vars
const testData = {
  wo1: [
    {
      description: 'workout test repeats',
      execution: {
        amount: 4,
        unit: 'repeats',
      },
      load: {
        amount: 1,
        increase: 0,
        unit: 'g',
      },
      pause: 10,
      repeats: 0,
      series: 2,
      title: 'test'
    },
    {
      description: 'workout test time',
      execution: {
        amount: 8,
        unit: 'seconds',
      },
      load: {
        amount: 1,
        increase: 0,
        unit: 'g',
      },
      pause: 10,
      series: 2,
      title: 'test 2'
    }
  ],
  empty: []
};

export default loadHome;
