import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc
} from 'firebase/firestore';
import Constants from 'expo-constants';

const app = initializeApp(Constants.manifest.web.config.firebase);
const db = getFirestore(app);

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
