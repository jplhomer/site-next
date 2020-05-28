import Wrapper from '@/components/Wrapper';
import { getPosts } from '@/lib/posts';
import { NextSeo } from 'next-seo';
import PostListItem from '@/components/PostListItem';

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
      <NextSeo title="Posts" />
      <h1 className="text-4xl font-extrabold mb-8">Posts</h1>

      <ul>
        {posts.map((post) => {
          return <PostListItem key={post.path} post={post} href="/posts/[slug]" as={`/posts/${post.nextPath}`} />;
        })}
      </ul>
    </Wrapper>
  );
}
