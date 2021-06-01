import firebase from 'firebase';
import 'firebase/database';

firebase.initializeApp({
  databaseURL: 'https://in-the-gym-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'in-the-gym'
});

const loadHome = (setter) => {
  const dbRef = firebase.database().ref();
  dbRef.child('1').get().then((snapshot) => {
    if (snapshot.exists()) {
      setter(snapshot.val());
    }
  });
};

export default loadHome;
