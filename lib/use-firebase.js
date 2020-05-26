import firebase from 'firebase/app';
import 'firebase/database';
import { useState, useEffect } from 'react';

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyDEa8iPgFFQpftT8HswxPX4zhD0P-U6NXY',
    authDomain: 'jplhomer-website.firebaseapp.com',
    databaseURL: 'https://jplhomer-website.firebaseio.com',
    projectId: 'jplhomer-website',
    storageBucket: 'jplhomer-website.appspot.com',
    messagingSenderId: '943503626359',
    appId: '1:943503626359:web:1dac1af51d5e9c62c0f672',
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

var db = firebase.database();

export function useFirestore(collection, documentId) {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);

  useEffect(() => {
    db.ref(collection)
      .child(documentId)
      .once('value', (snapshot) => {
        setValue(snapshot.val());
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  function persistValue(newValue) {
    db.ref(collection)
      .child(documentId)
      .transaction(() => newValue)
      .then(({ snapshot }) => setValue(snapshot.val()));
  }

  return [value, loading, persistValue];
}
