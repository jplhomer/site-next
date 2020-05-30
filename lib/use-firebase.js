import { useState, useEffect } from 'react';
import loadDb from '@/lib/db';

export function useFirebase(collection, documentId) {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const handleValue = (snapshot) => {
      setValue(snapshot.val());
      setLoading(false);
    };

    let db;

    async function fetchValue() {
      db = await loadDb();
      db.ref(collection).child(documentId).on('value', handleValue);
    }

    fetchValue();

    return () => {
      if (db) {
        db.ref(collection).child(documentId).off('value', handleValue);
      }
    };
  });

  return [value, loading, setValue];
}
