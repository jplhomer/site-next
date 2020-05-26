import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { getArchivePosts, getArchivePost } from '@/lib/archive-posts';

export async function getStaticProps({ params }) {
  const post = await getArchivePost(params);

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const { posts } = await getArchivePosts();
  const paths = posts.map((post) => ({
    params: {
      slug: post.nextSlug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function ArchivePost({ post }) {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;

  const openGraphImages = post.thumbnail ? [{ url: post.thumbnail }] : [];

  return (
    <div>
      <NextSeo
        title={post.title}
        openGraph={{
          images: openGraphImages,
        }}
      />
      <div className="max-w-3xl p-4 mx-auto prose">
        <h1 className="mb-4">{post.title}</h1>
        {post.dek && (
          <div className="text-xl mb-4 text-gray-600 italic" dangerouslySetInnerHTML={{ __html: post.dek }} />
        )}
        <div className="mb-8">
          <time dateTime={new Date(post.date).toISOString()}>{new Date(post.date).toLocaleDateString()}</time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    </div>
  );
}
