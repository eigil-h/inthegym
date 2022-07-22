import firebase from 'firebase/app';
import 'firebase/firestore';
import Constants from 'expo-constants';

firebase.initializeApp(Constants.manifest.web.config.firebase);
const firestore = firebase.firestore();

const loadHome = async (userId, setter) => {
  const workoutRef = firestore.collection(`user/${userId}/workout`);
  const workoutSnap = await workoutRef.get();
  const docs = {};
  workoutSnap.docs.forEach((doc) => {
    docs[doc.id] = doc.data()?.exercises;
  });

  setter(docs);
  // setter(testData);
};

export const updateWorkout = async (userId, name, data) => {
  try {
    await firestore.collection(`user/${userId}/workout`)
      .doc(name)
      .set(data);
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
