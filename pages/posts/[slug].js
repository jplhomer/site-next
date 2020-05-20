import { getPosts, getPost } from '@/lib/posts';
import dynamic from 'next/dynamic';

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.path.replace(/\.mdx?$/, ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await getPost(slug + '.md');

  return {
    props: {
      post,
      slug,
    },
  };
}

export default function Post({ post, slug }) {
  const Article = dynamic(() => import(`@/posts/${slug}.md`));

  return (
    <div className="max-w-3xl p-4 mx-auto prose">
      <h1 className="mb-8">{post.title}</h1>
      <div className="prose">
        <Article />
      </div>
    </div>
  );
}
