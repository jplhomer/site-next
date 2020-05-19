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
    <div className="mx-auto p-4 mt-8 max-w-3xl">
      <Head>
        <title>Josh Larson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-4">
          I'm Josh Larson. Nice to meet you!
        </h1>
        <p className="text-lg font-medium leading-relaxed">
          I'm a dad, a software engineer, a husband, and a creator. I work at{" "}
          <b>Vox Media</b>, and I live near <b>Des Moines, Iowa</b>. I'm
          passionate about <b>solving hard problems</b> and creating great
          experiences for other developers and end-users. Occasionally, I'll
          build things and write about them. This is one of those occasions.
        </p>
      </div>
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
