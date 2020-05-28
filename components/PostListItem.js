import Link from 'next/link';
import ExternalLink from 'heroicons/outline/external-link.svg';

export default function PostListItem({ post, href, as }) {
  const isExternal = Boolean(post.externalUrl);

  return (
    <li className="mb-2">
      <PostLink post={post} href={href} as={as}>
        <div className="block text-lg mb-1">
          <span className="align-middle">{post.title}</span>
          {isExternal && <ExternalMark url={post.externalUrl} />}
        </div>
        <time className="text-sm text-gray-600" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>
      </PostLink>
    </li>
  );
}

function PostLink({ post, href, as, children }) {
  const isExternal = Boolean(post.externalUrl);

  if (isExternal) {
    return <a href={post.externalUrl}>{children}</a>;
  }

  if (as) {
    return (
      <Link href={href} as={as}>
        <a>{children}</a>
      </Link>
    );
  }

  return <a href={href}>{children}</a>;
}

function ExternalMark({ url }) {
  return (
    <span className="text-gray-600">
      <span className="text-xs ml-2">{new URL(url).host}</span>
      <ExternalLink className="w-4 h-4 inline-block ml-1" />
    </span>
  );
}
