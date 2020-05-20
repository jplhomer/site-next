import Wrapper from './Wrapper';
import Link from 'next/link';
import { PER_PAGE } from '@/pages/archives';
import Head from 'next/head';

export default function ArchivePosts({ posts, total, page = 1 }) {
  const hasNextPage = Math.ceil(total / PER_PAGE) > page;
  const hasPreviousPage = page > 1;

  return (
    <Wrapper>
      <Head>
        <title>Archives - Page {page}</title>
      </Head>

      <h1 className="text-4xl font-extrabold mb-8">Archives</h1>

      {page == 1 && (
        <p className="text-sm text-gray-600 mb-8">
          Warning: Herein lies a collection of crusty old Internet web posts spanning all the way back from 2008 when I
          first launched my WordPress blog, self-hosted on a desktop computer running in my dorm room at Iowa State
          University. There are <b>{total} posts</b> in total. I like to think of it as a reflection of my self over the
          past couple decades — I've certainly grown and changed as a person.
        </p>
      )}

      <ul className="mb-8">
        {posts.map((post) => {
          return (
            <li className="mb-2" key={post.title}>
              <Link href="/[...slug]" as={`/${post.nextSlug.join('/')}`}>
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

      <nav className="flex justify-between items-center">
        <div>
          {hasPreviousPage && (
            <Link href="/archives/[page]" as={`/archives/${page - 1}`}>
              <a>Previous</a>
            </Link>
          )}
        </div>
        <div>
          {hasNextPage && (
            <Link href="/archives/[page]" as={`/archives/${page + 1}`}>
              <a>Next</a>
            </Link>
          )}
        </div>
      </nav>
    </Wrapper>
  );
}
