import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { getArchivePosts } from '@/lib/archive-posts';
import { getRafterPosts } from '@/lib/rafter-posts';
import { getBarkpassPosts } from '@/lib/barkpass-posts';
import { getPosts } from '@/lib/posts';
import { getGlances } from '@/lib/glances';

import Intro from '@/prose/intro.md';
import GlancePreview from '@/components/GlancePreview';
import styles from '@/css/glances.module.css';

export async function getStaticProps() {
  const [archivePosts, rafterPosts, barkpassPosts, posts, glances] = await Promise.all([
    getArchivePosts(5),
    getRafterPosts(),
    getBarkpassPosts(),
    getPosts(),
    getGlances(),
  ]);

  return {
    props: {
      archivePosts: archivePosts.posts,
      rafterPosts,
      barkpassPosts,
      posts: posts.slice(0, 5),
      glances: glances.slice(0, 5),
    },
  };
}

export default function Home({ archivePosts, rafterPosts, barkpassPosts, posts, glances }) {
  return (
    <div className="mt-8">
      <NextSeo title="Josh Larson - Software Engineer, Dad, Husband, Creator" />
      <div className="max-w-3xl mx-auto mb-8 p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-4">I'm Josh Larson. Nice to meet you!</h1>
          <div className="prose text-lg font-medium leading-relaxed mb-4">
            <Intro />
          </div>
        </div>
        <ul className="mb-4">
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
        <Link href="/posts">
          <a className="text-sm text-gray-600 font-medium ">All Posts</a>
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-3 mb-8 mx-auto max-w-6xl p-4">
        <PostList title="Inside Rafter" link="https://blog.rafter.app">
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
        <PostList title="Building Barkpass" link="https://building.barkpass.com">
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
        <PostList title="Archive" link="/archives">
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
        <div className="max-w-5xl mx-auto mb-8 p-4">
          <h2 className="font-bold text-2xl mb-4">Projects</h2>
          <p>I like to build things in my spare time. Here are a few selections:</p>
        </div>
        <Project
          title="Rafter"
          image="/rafter.jpg"
          status="In Progress"
          buttonText="View on GitHub"
          buttonUrl="https://github.com/rafter-platform/rafter"
        >
          Rafter is an open-source serverless deployment platform built on top of Google Cloud. It's a side project I
          started building in 2020. I'm also writing about it on{' '}
          <a className="underline" href="https://blog.rafter.app">
            its own blog
          </a>
          .
        </Project>
        <Project
          title="Barkpass"
          image="https://www.barkpass.com/images/barkpass_dashboard.jpg"
          status="Launched"
          buttonText="Visit Barkpass"
          buttonUrl="https://www.barkpass.com"
          flipped
        >
          Launched in 2019, Barkpass is a pet licensing and dog park management software-as-a-service created by Bri and
          me. We have one customer so far, but we're looking to expand soon. Be sure to{' '}
          <a className="underline" href="https://building.barkpass.com">
            check out the blog
          </a>
          .
        </Project>
        <Project
          title="Fresa"
          image="/fresa.jpg"
          status="Launched"
          buttonText="View Docs"
          buttonUrl="https://fresa.jplhomer.org"
        >
          Imagine if WordPress objects were as fluent and modern as Laravel Eloquent or Rails ActiveRecord models. Fresa
          makes that dream come true.
        </Project>
        <Project
          title="Full-Stack Fundamentals"
          image="/fsf.jpg"
          status="On Hold"
          buttonText="Visit Website"
          buttonUrl="https://fullstackfundamentals.com"
          flipped
        >
          In 2018, I started an educational website where I'd planned to record screencasts of all the cool things I
          learned. As it turns out, this was a lot more time-consuming than I thought, and the site never took off. But
          it's still out there!
        </Project>
        <Project
          title="Lifeboat"
          status="Archived"
          buttonText="Visit Website"
          buttonUrl="https://uselifeboat.com"
          image="/lifeboat.jpg"
        >
          Docker Compose is a command-line tool which can feel out of reach for beginners. I built a graphical user
          interface for it and called it Lifeboat.
        </Project>
      </div>
      <div className="max-w-5xl mx-auto mb-8 p-4">
        <h2 className="font-bold text-2xl mb-4">Glances</h2>
        <p className="mb-8">
          Check out some highlights from my world, or{' '}
          <Link href="/glances">
            <a className="underline">view them all</a>
          </Link>
          :
        </p>
        <div className="grid gap-4 md:gap-8 grid-cols-3 md:grid-cols-5">
          {glances.map((glance) => (
            <Link key={glance.slug} href="/glances/[slug]" as={`/glances/${glance.slug}`}>
              <a className={styles['glance-preview']}>
                <GlancePreview glance={glance} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostList({ title, children, link }) {
  const internalLink = link.startsWith('/');

  function getLink() {
    if (internalLink) {
      return (
        <Link href={link}>
          <a>{title}</a>
        </Link>
      );
    }

    return <a href={link}>{title}</a>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">📝 {getLink()}</h2>
      {children}
    </div>
  );
}

function Project({ title, image, children, status, buttonUrl, buttonText, flipped = false }) {
  return (
    <div className={`py-12 ${flipped ? 'bg-white' : ''}`}>
      <div className={`max-w-5xl mx-auto px-4 md:px-0 md:flex ${flipped ? 'flex-row-reverse' : ''}`}>
        <div className="mb-8 md:mb-0 md:w-1/2 md:px-4">
          <div className="flex">
            <h2 className="inline-flex text-2xl tracking-tight leading-10 font-bold sm:leading-none mr-4">
              <a href={buttonUrl}>{title}</a>
            </h2>
            <ProjectBadge>{status}</ProjectBadge>
          </div>
          <p className="mt-3 mb-3 text-base sm:mt-5 md:mt-5 md:mb-5">{children}</p>
          <span className="inline-flex rounded-md shadow-sm">
            <span className="inline-flex rounded-md shadow-sm">
              <a
                href={buttonUrl}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              >
                {buttonText}
              </a>
            </span>
          </span>
        </div>
        <div className="md:w-1/2  md:px-4">
          <img
            loading="lazy"
            className="shadow-xl"
            src={
              image ||
              'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80'
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

function ProjectBadge({ children }) {
  const color = getColor();

  function getColor() {
    if (/progress/i.test(children)) {
      return 'bg-yellow-100 text-yellow-800';
    }

    if (/launch/i.test(children)) {
      return 'bg-green-100 text-green-800';
    }

    return 'bg-gray-100 text-gray-800';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 ${color} m-auto ml-0`}
    >
      {children}
    </span>
  );
}
