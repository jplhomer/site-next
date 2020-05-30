import db from '@/lib/db-admin';

export default async (req, res) => {
  if (!req.query.slug) {
    return res.status(400).json({
      error: 'Missing "slug" query parameter',
    });
  }

  const ref = db.ref('page-views').child(req.query.slug);

  const { snapshot } = await ref.transaction((currentViews) => {
    if (currentViews === null) {
      return 1;
    }

    return currentViews + 1;
  });

  return res.status(200).json({
    total: snapshot.val(),
  });
};
