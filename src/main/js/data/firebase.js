import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, signInAnonymously } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc
} from 'firebase/firestore';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(Constants.expoConfig.web.config.firebase);
const db = getFirestore(app);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

// eslint-disable-next-line consistent-return
export const signInAnon = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error('Error:', error);
    // Handle errors (e.g., alert the user or log analytics)
  }
};

const loadHome = async (userId, setter) => {
  const workoutSnap = await getDocs(collection(db, `user/${userId}/workout`));
  const docs = {};
  workoutSnap.forEach((doc_) => {
    docs[doc_.id] = doc_.data()?.exercises;
  });

  setter(docs);
  // setter(testData);
};

export const updateWorkout = async (userId, name, data) => {
  try {
    await setDoc(doc(db, `user/${userId}/workout`, name), data);
    return true;
  } catch (e) {
    return false;
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
