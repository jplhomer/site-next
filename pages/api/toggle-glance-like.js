import db from '@/lib/db-admin';
const admin = require('firebase-admin');

export default (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      error: 'Only POST requests are permitted',
    });
  }

  if (!req.body.slug) {
    return res.status(400).json({
      error: 'Missing "slug" post parameter',
    });
  }

  /**
   * Increment will be assumed, unless `decrement: true` is passed in the JSON payload.
   */
  const value = req.body.decrement ? -1 : 1;

  const doc = db.collection('glances').doc(req.body.slug);

  return doc.get().then((data) => {
    if (!data.exists) {
      doc.set({
        likes: 1,
      });

      return res.status(200).json({
        total: 1,
      });
    }

    doc.update({
      likes: admin.firestore.FieldValue.increment(value),
    });

    return res.status(200).json({
      total: data.data().likes + value,
    });
  });
};
