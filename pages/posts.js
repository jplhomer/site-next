import Wrapper from '@/components/Wrapper';
import { getPosts } from '@/lib/posts';
import Link from 'next/link';

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function Posts({ posts }) {
  return (
    <Wrapper>
      <h1 className="text-4xl font-extrabold mb-8">Posts</h1>

      <ul>
        {posts.map((post) => {
          return (
            <li className="mb-2" key={post.path}>
              <Link href="/posts/[slug]" as={`/posts/${post.path.replace(/.mdx?/, '')}`}>
                <a>
                  <div className="block text-lg mb-1">{post.title}</div>
                  <time className="text-sm text-gray-600" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
}
