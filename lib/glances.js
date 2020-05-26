export async function getGlances() {
  return Array.from({ length: 9 })
    .map((_, idx) => ({
      slug: `slug-${idx}`,
      date: '2020-05-25 22:18:38',
      body: '<p>This is a photo of my son, Barrett.</p>',
      image:
        'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/91862338_105679557662188_7904687679393336429_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=2VyTdH9q9lMAX8AT6Aw&oh=933ee4566ee2d5156b560fa5a1925021&oe=5EF651B9',
    }))
    .concat([
      {
        slug: `baby-bear-ett`,
        date: '2020-04-29',
        body: '<p>Barrett tries on a new hat. We cannot handle the adorableness.</p>',
        video: 'https://www.youtube.com/watch?v=-3KtQVTee4A',
      },
    ]);
}

export async function getGlance(slug) {
  return {
    slug,
    date: '2020-05-25 06:38:25',
    body: '<p>This is a photo of my son, Barrett.</p>',
    totalLikes: 33,
    image:
      'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/91862338_105679557662188_7904687679393336429_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=2VyTdH9q9lMAX8AT6Aw&oh=933ee4566ee2d5156b560fa5a1925021&oe=5EF651B9',
  };
}
