import Wrapper from '@/components/Wrapper';
import { getPosts } from '@/lib/posts';
import { NextSeo } from 'next-seo';
import PostListItem from '@/components/PostListItem';
import Heading from '@/components/Heading';

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
      <Heading className="mb-8">Posts</Heading>

      <ul>
        {posts.map((post) => {
          return <PostListItem key={post.path} post={post} href="/posts/[slug]" as={`/posts/${post.nextPath}`} />;
        })}
      </ul>
    </Wrapper>
  );
}
