import db from '@/lib/db-admin';

export default async (req, res) => {
  if (!req.method === 'POST') {
    return res.status(400).json({
      error: 'Only supported request method is POST',
    });
  }

  if (!req.body.slug) {
    return res.status(400).json({
      error: 'Missing "slug" body parameter',
    });
  }

  const delta = req.body.decrement ? -1 : 1;

  const ref = db.ref('glance-likes').child(req.body.slug);

  const { snapshot } = await ref.transaction((currentLikes) => {
    if (currentLikes === null || currentLikes === 0) {
      return Math.max(delta, 0);
    }

    return currentLikes + delta;
  });

  return res.status(200).json({
    total: snapshot.val(),
  });
};
