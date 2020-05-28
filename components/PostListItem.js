import Link from 'next/link';
import ExternalLink from 'heroicons/outline/external-link.svg';
import ViewCounter from './ViewCounter';

export default function PostListItem({ post, href, as }) {
  const isExternal = Boolean(post.externalUrl);

  return (
    <li className="mb-3 -mx-2">
      <PostLink post={post} href={href} as={as}>
        <div className="md:flex justify-between items-center">
          <div className="block text-lg">
            <span className="align-middle">{post.title}</span>
            {isExternal && <ExternalMark url={post.externalUrl} />}
          </div>
          {!isExternal ? <ViewCounter id={as} /> : <span></span>}
        </div>
        <div>
          <time className="text-sm text-gray-500 mr-2" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
        </div>
      </PostLink>
    </li>
  );
}

function PostLink({ post, href, as, children }) {
  const isExternal = Boolean(post.externalUrl);
  const classes = 'p-2 block hover:bg-gray-200';

  if (isExternal) {
    return (
      <a className={classes} href={post.externalUrl}>
        {children}
      </a>
    );
  }

  if (as) {
    return (
      <Link href={href} as={as}>
        <a className={classes}>{children}</a>
      </Link>
    );
  }

  return (
    <a className={classes} href={href}>
      {children}
    </a>
  );
}

function ExternalMark({ url }) {
  return (
    <span className="text-gray-600 whitespace-no-wrap block md:inline-block">
      <span className="text-xs md:ml-2">{new URL(url).host}</span>
      <ExternalLink className="w-4 h-4 inline-block ml-1" />
    </span>
  );
}
