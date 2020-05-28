import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { getArchivePosts, getArchivePost } from '@/lib/archive-posts';
import Loading from '@/components/Loading';
import ViewCounter from '@/components/ViewCounter';

export async function getStaticProps({ params }) {
  const post = await getArchivePost(params);

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  // Only do the first ten to speed up build times
  const { posts } = await getArchivePosts(10);
  const paths = posts.map((post) => ({
    params: {
      slug: post.nextSlug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function ArchivePost({ post }) {
  const router = useRouter();

  if (router.isFallback) return <Loading />;

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
        <div className="mb-8 flex justify-between">
          <time dateTime={new Date(post.date).toISOString()}>{new Date(post.date).toLocaleDateString()}</time>
          <ViewCounter id={post.nextPath} shouldIncrement={true} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    </div>
  );
}
