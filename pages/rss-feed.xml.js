import { getPosts } from '@/lib/posts';
import { getArchivePosts } from '@/lib/archive-posts';
import RSS from 'rss';

export async function getServerSideProps({ res }) {
  const posts = await getPosts();
  const { posts: archivePosts } = await getArchivePosts();
  const allPosts = posts.concat(archivePosts).filter((post) => !post.externalUrl);
  const siteUrl = 'https://jplhomer.org';

  const rss = new RSS({
    title: 'Josh Larson',
    site_url: siteUrl,
  });

  allPosts.map((post) => {
    rss.item({
      title: post.title,
      guid: post.nextPath,
      url: `${siteUrl}/${post.nextPath}`,
      author: 'Josh Larson',
      date: post.date,
    });
  });

  const xmlFeed = rss.xml({ indent: true });

  res.setHeader('Content-Type', 'text/xml');
  res.write(xmlFeed);
  res.end();
}

export default function RssFeed() {
  return '';
}
