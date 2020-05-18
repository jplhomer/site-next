import Head from "next/head";
import Link from "next/link";
import { getArchivePosts } from "@/lib/archive";

export async function getStaticProps() {
  let archivePosts = await getArchivePosts();

  return {
    props: {
      archivePosts: archivePosts.slice(0, 4),
    },
  };
}

export default function Home({ archivePosts }) {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Josh Larson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-black mb-4">Josh Larson</h1>
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
      - Software engineer - Work at Vox Media - Passionate about solving hard
      problems and creating good developer experiences WRITING - Main blog (MDX
      posts from here) - Inside Rafter - Building Barkpass - Archive (WP)
      PROJECTS - Barkpass - Rafter - Fresa - Full Stack Fundamentals (on-hold) -
      Lifeboat (archived) GLANCES - Videos with Barrett - Good pics I want to
      share - Livestreams - Other quirky things
    </div>
  );
}
