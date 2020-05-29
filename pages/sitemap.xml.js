import { getPosts } from '@/lib/posts';
import { getArchivePosts } from '@/lib/archive-posts';

export async function getServerSideProps({ res }) {
  const posts = await getPosts();
  const { posts: archivePosts } = await getArchivePosts();
  const allPosts = posts.concat(archivePosts).filter((post) => !post.externalUrl);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPosts
        .map((post) => {
          return `
                  <url>
                      <loc>${`https://jplhomer.org/${post.nextPath}`}</loc>
                  </url>
              `;
        })
        .join('')}
  </urlset>
`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}

export default function Sitemap() {
  return '';
}
