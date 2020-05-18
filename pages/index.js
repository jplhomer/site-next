import Head from "next/head";
import Link from "next/link";
import { getArchivePosts } from "@/lib/archive-posts";
import { getRafterPosts } from "@/lib/rafter-posts";
import { getBarkpassPosts } from "@/lib/barkpass-posts";

export async function getStaticProps() {
  const archivePosts = await getArchivePosts();
  const rafterPosts = await getRafterPosts();
  const barkpassPosts = await getBarkpassPosts();

  return {
    props: {
      archivePosts: archivePosts.slice(0, 4),
      rafterPosts,
      barkpassPosts,
    },
  };
}

export default function Home({ archivePosts, rafterPosts, barkpassPosts }) {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Josh Larson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-black mb-4">Josh Larson</h1>
      <h2>Archive:</h2>
      <ul>
        {archivePosts.map((post) => {
          return (
            <li key={post.id}>
              <Link href="/[...slug]" as={`/${post.nextSlug.join("/")}`}>
                <a>{post.title.rendered}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <h2>Inside Rafter</h2>
      <ul>
        {rafterPosts.map((post) => {
          return (
            <li key={post.title}>
              <a href={post.link}>{post.title}</a>
            </li>
          );
        })}
      </ul>
      <h2>Building Barkpass</h2>
      <ul>
        {barkpassPosts.map((post) => {
          return (
            <li key={post.title}>
              <a href={post.url}>{post.title}</a>
            </li>
          );
        })}
      </ul>
      - Software engineer - Work at Vox Media - Passionate about solving hard
      problems and creating good developer experiences WRITING - Main blog (MDX
      posts from here) - Inside Rafter - Building Barkpass - Archive (WP)
      PROJECTS - Barkpass - Rafter - Fresa - Full Stack Fundamentals (on-hold) -
      Lifeboat (archived) GLANCES - Videos with Barrett - Good pics I want to
      share - Livestreams - Other quirky things
    </div>
  );
}
