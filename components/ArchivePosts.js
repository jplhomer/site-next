import Wrapper from './Wrapper';
import Link from 'next/link';
import { PER_PAGE } from '@/pages/archives';

export default function ArchivePosts({ posts, total, page = 1 }) {
  const hasNextPage = Math.ceil(total / PER_PAGE) > page;
  const hasPreviousPage = page > 1;

  return (
    <Wrapper>
      <h1 className="text-4xl font-extrabold mb-8">Archives</h1>

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
