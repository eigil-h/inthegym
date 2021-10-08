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
};

export default loadHome;
