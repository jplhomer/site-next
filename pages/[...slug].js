import { useRouter } from "next/router";
import Head from "next/head";
import { getArchivePosts } from "@/lib/archive-posts";

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://jplhomer.test/wp-json/wp/v2/posts?slug=${params.slug[2]}`
  );
  const post = await res.json();

  return {
    props: { post: post[0] },
  };
}

export async function getStaticPaths() {
  const posts = await getArchivePosts();
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

  return (
    <div>
      <Head>
        <title>{post.title.rendered}</title>
      </Head>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
