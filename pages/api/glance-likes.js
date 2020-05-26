import db from '@/lib/db-admin';

export default (req, res) => {
  if (!req.query.slug) {
    return res.status(400).json({
      error: 'Missing "slug" query parameter',
    });
  }

  const doc = db.collection('glances').doc(req.query.slug);

  return doc.get().then((data) => {
    if (!data.exists) {
      res.status(200).json({
        total: 0,
      });
    } else {
      res.status(200).json({
        total: data.data().likes,
      });
    }
  });
};
