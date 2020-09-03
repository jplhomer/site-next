import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { getRafterPosts } from '@/lib/rafter-posts';
import { getBarkpassPosts } from '@/lib/barkpass-posts';
import { getPosts } from '@/lib/posts';
import { getGlances } from '@/lib/glances';

import Intro from '@/prose/intro.md';
import GlancePreview from '@/components/GlancePreview';
import styles from '@/css/glances.module.css';
import PostListItem from '@/components/PostListItem';

export async function getStaticProps() {
  const [rafterPosts, barkpassPosts, posts, glances] = await Promise.all([
    getRafterPosts(),
    getBarkpassPosts(),
    getPosts(),
    getGlances(),
  ]);

  return {
    props: {
      rafterPosts,
      barkpassPosts,
      posts: posts.slice(0, 5),
      glances: glances.slice(0, 5),
    },
  };
}

export default function Home({ rafterPosts, barkpassPosts, posts, glances }) {
  return (
    <div className="mt-8">
      <NextSeo
        title="Josh Larson - Software Engineer, Dad, Husband, Creator"
        description="I'm a dad, a software engineer, and a creator. I'm passionate about solving hard problems and creating great experiences for other people."
      />
      <div className="max-w-3xl mx-auto mb-6 p-4">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">I'm Josh Larson. Nice to meet you!</h1>
          <div className="prose text-lg font-medium leading-relaxed mb-4">
            <Intro />
          </div>
        </div>
        <ul className="mb-4">
          {posts.map((post) => {
            return <PostListItem key={post.title} post={post} href="/posts/[slug]" as={`/posts/${post.nextPath}`} />;
          })}
        </ul>
        <Link href="/posts">
          <a className="text-sm text-gray-600 dark:text-gray-300 font-medium">All Posts</a>
        </Link>
        <span className="mx-2">/</span>
        <Link href="/archives">
          <a className="text-sm text-gray-600 dark:text-gray-300 font-medium">Archives</a>
        </Link>{' '}
        <p className="mt-16 text-lg">
          Here are some <strong>projects</strong> I've been building in my spare time:
        </p>
      </div>
      <div>
        <Project
          title="Flareact"
          image="/flareact.jpg"
          status="Launched"
          buttonText="View Docs"
          buttonUrl="https://flareact.com"
        >
          Flareact is an edge-rendered React framework built for{' '}
          <a className="underline font-medium whitespace-no-wrap" href="https://workers.cloudflare.com/">
            Cloudflare Workers
          </a>
          . It is an open-source project inspired by{' '}
          <a className="underline font-medium whitespace-no-wrap" href="https://nextjs.org">
            Next.js
          </a>
          . Check out the docs below, or visit the{' '}
          <a className="underline font-medium whitespace-no-wrap" href="https://github.com/flareact/flareact">
            GitHub repo
          </a>
          .
        </Project>
        <Project
          title="Rafter"
          image="/rafter.jpg"
          status="In Progress"
          buttonText="View on GitHub"
          buttonUrl="https://github.com/rafter-platform/rafter"
          flipped
        >
          <div className="mb-4">
            Rafter is an open-source serverless deployment platform built on top of Google Cloud. It's a side project I
            started building in 2020. I'm also writing about it on its own blog,{' '}
            <a className="underline font-medium whitespace-no-wrap" href="https://blog.rafter.app">
              Inside Rafter
            </a>
            :
          </div>

          <ul className="mb-4">
            {rafterPosts.map((post) => (
              <li className="mb-1 text-sm" key={post.title}>
                <time className="text-gray-600 dark:text-gray-300 text-xs w-16 mr-2 inline-block" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString()}
                </time>

                <a className="underline" href={post.url}>
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </Project>
        <Project
          title="Barkpass"
          image="https://www.barkpass.com/images/barkpass_dashboard.jpg"
          status="Launched"
          buttonText="Visit Barkpass"
          buttonUrl="https://www.barkpass.com"
        >
          <div className="mb-4">
            Launched in 2019, Barkpass is a pet licensing and dog park management software-as-a-service created by Bri
            and me. We have one customer so far, but we're looking to expand soon. Be sure to check out the blog,{' '}
            <a className="font-medium underline" href="https://building.barkpass.com">
              Building Barkpass
            </a>
            :
          </div>
          <ul className="mb-4">
            {barkpassPosts.map((post) => (
              <li className="mb-1 text-sm" key={post.title}>
                <time className="text-gray-600 dark:text-gray-300 text-xs w-16 mr-2 inline-block" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString()}
                </time>

                <a className="underline" href={post.url}>
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </Project>
        <Project
          title="Fresa"
          image="/fresa.jpg"
          status="Launched"
          buttonText="View Docs"
          buttonUrl="https://fresa.jplhomer.org"
          flipped
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
          flipped
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

function Project({ title, image, children, status, buttonUrl, buttonText, flipped = false }) {
  return (
    <div className={`py-12 ${flipped ? 'bg-white dark:bg-gray-800' : ''}`}>
      <div className={`max-w-5xl mx-auto px-4 md:px-0 md:flex ${flipped ? 'flex-row-reverse' : ''}`}>
        <div className="mb-8 md:mb-0 md:w-1/2 md:px-4">
          <div className="flex">
            <h2 className="inline-flex text-xl tracking-tight leading-10 font-bold sm:leading-none mr-4">
              <a href={buttonUrl}>{title}</a>
            </h2>
            <ProjectBadge>{status}</ProjectBadge>
          </div>
          <div className="mt-3 mb-3 text-base sm:mt-5 md:mt-5 md:mb-5">{children}</div>
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

Home.favicon = '👋';
