import Head from 'next/head';
import Link from 'next/link';

import { getArchivePosts } from '@/lib/archive-posts';
import { getRafterPosts } from '@/lib/rafter-posts';
import { getBarkpassPosts } from '@/lib/barkpass-posts';
import { getPosts } from '@/lib/posts';

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

export default function Home({ archivePosts, rafterPosts, barkpassPosts, posts }) {
  return (
    <div className="mt-8">
      <Head>
        <title>Josh Larson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl mx-auto mb-8 p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-4">I'm Josh Larson. Nice to meet you!</h1>
          <p className="text-lg font-medium leading-relaxed">
            I'm a dad, a software engineer, a husband, and a creator. I work at <b>Vox Media</b>, and I live near{' '}
            <b>Des Moines, Iowa</b>. I'm passionate about <b>solving hard problems</b> and creating great experiences
            for other developers and end-users. Occasionally, I'll build things and write about them. This is one of
            those occasions.
          </p>
        </div>
        <ul>
          {posts.map((post) => {
            return (
              <li className="mb-2" key={post.path}>
                <Link href="/posts/[slug]" as={`/posts/${post.path.replace(/.mdx?/, '')}`}>
                  <a>
                    <div className="block text-lg mb-1">{post.title}</div>
                    <time className="text-sm text-gray-600" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid gap-4 lg:grid-cols-3 mb-8 mx-auto max-w-6xl p-4">
        <PostList title="Inside Rafter">
          <ul>
            {rafterPosts.map((post) => {
              return (
                <li className="mb-1" key={post.title}>
                  <a className="block" href={post.url}>
                    <div>{post.title}</div>
                    <time className="text-sm text-gray-600" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </a>
                </li>
              );
            })}
          </ul>
        </PostList>
        <PostList title="Building Barkpass">
          <ul>
            {barkpassPosts.map((post) => {
              return (
                <li className="mb-1" key={post.title}>
                  <a className="block" href={post.url}>
                    <div>{post.title}</div>
                    <time className="text-sm text-gray-600" dateTime={post.date_published}>
                      {new Date(post.date_published).toLocaleDateString()}
                    </time>
                  </a>
                </li>
              );
            })}
          </ul>
        </PostList>
        <PostList title="Archive">
          <ul>
            {archivePosts.map((post) => {
              return (
                <li className="mb-1" key={post.id}>
                  <Link href="/[...slug]" as={`/${post.nextSlug.join('/')}`}>
                    <a className="block">
                      <div>{post.title}</div>
                      <time className="text-sm text-gray-600" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </PostList>
      </div>
      <div>
        <div className="max-w-3xl mx-auto mb-8 p-4">
          <h2 className="font-bold text-2xl mb-4">Projects</h2>
          <p>I like to build things in my spare time. Here are a few selections:</p>
        </div>
        <Project title="Barkpass" image="https://www.barkpass.com/images/barkpass_dashboard.jpg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque rerum molestiae tenetur et beatae nobis
          voluptatem, blanditiis unde quibusdam laboriosam, reprehenderit eum nemo cum suscipit. Placeat porro eveniet
          numquam in!
        </Project>
        <Project title="Rafter" image="/rafter.png" flipped>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque rerum molestiae tenetur et beatae nobis
          voluptatem, blanditiis unde quibusdam laboriosam, reprehenderit eum nemo cum suscipit. Placeat porro eveniet
          numquam in!
        </Project>
        <Project title="Fresa" image="/fresa.png">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque rerum molestiae tenetur et beatae nobis
          voluptatem, blanditiis unde quibusdam laboriosam, reprehenderit eum nemo cum suscipit. Placeat porro eveniet
          numquam in!
        </Project>
        <Project title="Full-Stack Fundamentals" image="/fsf.png" flipped>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque rerum molestiae tenetur et beatae nobis
          voluptatem, blanditiis unde quibusdam laboriosam, reprehenderit eum nemo cum suscipit. Placeat porro eveniet
          numquam in!
        </Project>
        <Project
          title="Lifeboat"
          image="https://user-images.githubusercontent.com/848147/32585014-ea2a74b2-c4c0-11e7-8563-9bd4800590ff.png"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque rerum molestiae tenetur et beatae nobis
          voluptatem, blanditiis unde quibusdam laboriosam, reprehenderit eum nemo cum suscipit. Placeat porro eveniet
          numquam in!
        </Project>
      </div>
      GLANCES - Videos with Barrett - Good pics I want to share - Livestreams - Other quirky things
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

function Project({ title, image, children, flipped = false }) {
  const polygonPoints = flipped ? '0,0 50,0 100,100 50,100' : '50,0 100,0 50,100 0,100';
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex">
        <div
          className={`relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 ${
            flipped ? 'lg:ml-auto lg:mr-0 lg:pl-8' : ''
          }`}
        >
          <svg
            className={`hidden lg:block absolute h-full w-48 text-white transform ${
              flipped ? 'left-0 inset-y-0 -translate-x-1/2' : 'right-0 inset-y-0 translate-x-1/2'
            }`}
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points={polygonPoints}></polygon>
          </svg>

          <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-5xl">
                {title}
              </h2>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {children}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`lg:absolute lg:w-1/2 ${flipped ? 'lg:inset-y-0 lg:left-0' : 'lg:inset-y-0 lg:right-0 '}`}>
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={
            image ||
            'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80'
          }
          alt=""
        />
      </div>
    </div>
  );
}
