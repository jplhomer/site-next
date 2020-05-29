import { getPosts } from '@/lib/posts';
import { getArchivePosts } from '@/lib/archive-posts';

export async function getServerSideProps({ res }) {
  const posts = await getPosts();
  const { posts: archivePosts } = await getArchivePosts();
  const allPosts = posts.concat(archivePosts).filter((post) => !post.externalUrl);
  const siteUrl = 'https://jplhomer.org';

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1',
    title: 'Josh Larson',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: "Josh Larson's personal site.",
    favicon: `${siteUrl}/favicon.ico`,
    items: allPosts.map((post) => ({
      id: `${siteUrl}/${post.nextPath}`,
      url: `${siteUrl}/${post.nextPath}`,
      title: post.title,
      date_published: post.date,
      author: 'Josh Larson',
    })),
  };

  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(jsonFeed));
  res.end();
}

export default function JsonFeed() {
  return '';
}
