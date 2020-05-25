import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC08c1Br1FrBE1W0ixeGi1C4UCFW9pDrOc',
  authDomain: 'react-crud-app-71cc6.firebaseapp.com',
  databaseURL: 'https://react-crud-app-71cc6.firebaseio.com',
  projectId: 'react-crud-app-71cc6',
  storageBucket: 'react-crud-app-71cc6.appspot.com',
  messagingSenderId: '239378901078',
  appId: '1:239378901078:web:9cdc7b12d4b49c4567b3f7',
};
// Initialize Firebase
var firebaseDb = firebase.initializeApp(firebaseConfig);

export default firebaseDb;
