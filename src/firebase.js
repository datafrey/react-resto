import firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCoQDk3NmsfKitCF33Q0LYQIASC_4DXAO8',
  authDomain: 'resto-45fa8.firebaseapp.com',
  databaseURL: 'https://resto-45fa8-default-rtdb.firebaseio.com',
  projectId: 'resto-45fa8',
  storageBucket: 'resto-45fa8.appspot.com',
  messagingSenderId: '1003696199974',
  appId: '1:1003696199974:web:b859fbc1c12ab4357f49e7'
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();
