import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAykPmfxkLGYggsoIdoN1La00uFOy5z8E4',
  authDomain: 'instagram-clone-react-2aab8.firebaseapp.com',
  databaseURL: 'https://instagram-clone-react-2aab8-default-rtdb.firebaseio.com',
  projectId: 'instagram-clone-react-2aab8',
  storageBucket: 'instagram-clone-react-2aab8.appspot.com',
  messagingSenderId: '268611406743',
  appId: '1:268611406743:web:e2a7ecae8e25c1ede052d2',
});

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

// export default db;
