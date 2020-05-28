import { getPosts, getPost, getFilenameFromSlug } from '@/lib/posts';
import { NextSeo } from 'next-seo';
import ViewCounter from '@/components/ViewCounter';

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

  const post = await getPost(filename, true);

  return {
    props: {
      post,
      slug,
      filename,
    },
  };
}

export default function Post({ post }) {
  return (
    <div className="max-w-3xl p-4 mx-auto prose">
      <NextSeo title={post.title} />
      <h1 className="mb-4">{post.title}</h1>
      <div className="mb-8 flex justify-between">
        <time dateTime={new Date(post.date).toISOString()}>{new Date(post.date).toLocaleDateString()}</time>
        <ViewCounter id={post.nextPath} shouldIncrement={true} />
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.body }}></div>
    </div>
  );
}
