import Wrapper from './Wrapper';
import Link from 'next/link';
import { PER_PAGE } from '@/pages/archives';
import { NextSeo } from 'next-seo';
import PostListItem from './PostListItem';
import Heading from './Heading';

export default function ArchivePosts({ posts, total, page = 1 }) {
  const hasNextPage = Math.ceil(total / PER_PAGE) > page;
  const hasPreviousPage = page > 1;

  return (
    <Wrapper>
      <NextSeo title={`Archives - Page ${page}`} />

      <Heading className="mb-8">
        Archives
        {page > 1 && ` - Page ${page}`}
      </Heading>

      {page == 1 && (
        <p className="mb-8">
          Warning: Herein lies a collection of crusty old Internet web posts spanning all the way back from 2008 when I
          first launched my WordPress blog, self-hosted on a desktop computer running in my dorm room at Iowa State
          University. There are <b>{total} posts</b> in total. I like to think of it as a reflection of my self over the
          past couple decades — I&apos;ve certainly grown and changed as a person.
        </p>
      )}

      <ul className="mb-8">
        {posts.map((post) => {
          return <PostListItem post={post} href="/[...slug]" as={`/${post.nextPath}`} key={post.title} />;
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
