import { getPosts, getPost, getFilenameFromSlug } from '@/lib/posts';
import dynamic from 'next/dynamic';
import Head from 'next/head';

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
  const filename = await getFilenameFromSlug(slug);

  const post = await getPost(filename);

  return {
    props: {
      post,
      slug,
      filename,
    },
  };
}

export default function Post({ post, filename }) {
  const Article = dynamic(() => import(`@/posts/${filename}`));

  return (
    <div className="max-w-3xl p-4 mx-auto prose">
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className="mb-4">{post.title}</h1>
      <div className="mb-8">
        <time dateTime={new Date(post.date).toISOString()}>{new Date(post.date).toLocaleDateString()}</time>
      </div>
      <div className="prose">
        <Article />
      </div>
    </div>
  );
}
