import Head from "next/head";
import Link from "next/link";
import { getArchivePosts } from "@/lib/archive-posts";
import { getRafterPosts } from "@/lib/rafter-posts";
import { getBarkpassPosts } from "@/lib/barkpass-posts";
import { getPosts } from "@/lib/posts";

export async function getStaticProps() {
  const [archivePosts, rafterPosts, barkpassPosts, posts] = await Promise.all([
    getArchivePosts(),
    getRafterPosts(),
    getBarkpassPosts(),
    getPosts(),
  ]);

  return {
    props: {
      archivePosts: archivePosts.slice(0, 5),
      rafterPosts,
      barkpassPosts,
      posts: posts.slice(0, 5),
    },
  };
}

export default function Home({
  archivePosts,
  rafterPosts,
  barkpassPosts,
  posts,
}) {
  return (
    <div className="mx-auto max-w-5xl p-4 mt-8">
      <Head>
        <title>Josh Larson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl mx-auto mb-8">
        <div className="mb-8 ">
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
        <ul>
          {posts.map((post) => {
            return (
              <li className="mb-2" key={post.path}>
                <Link
                  href="/posts/[slug]"
                  as={`/posts/${post.path.replace(/.mdx?/, "")}`}
                >
                  <a>
                    <div className="block text-lg mb-1">{post.title}</div>
                    <time
                      className="text-sm text-gray-600"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleString()}
                    </time>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid gap-4 grid-cols-3 mb-8">
        <PostList title="Inside Rafter">
          <ul>
            {rafterPosts.map((post) => {
              return (
                <li key={post.title}>
                  <a href={post.link}>{post.title}</a>
                </li>
              );
            })}
          </ul>
        </PostList>
        <PostList title="Building Barkpass">
          <ul>
            {barkpassPosts.map((post) => {
              return (
                <li key={post.title}>
                  <a href={post.url}>{post.title}</a>
                </li>
              );
            })}
          </ul>
        </PostList>
        <PostList title="Archive">
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
        </PostList>
      </div>
      PROJECTS - Barkpass - Rafter - Fresa - Full Stack Fundamentals (on-hold) -
      Lifeboat (archived) <br />
      GLANCES - Videos with Barrett - Good pics I want to share - Livestreams -
      Other quirky things
    </div>
  );
}

function PostList({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">📝 {title}</h2>
      {children}
    </div>
  );
}
