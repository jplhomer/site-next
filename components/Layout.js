import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className="max-w-4xl mx-auto mb-12 flex items-center justify-between px-4 py-8">
        <Link href="/">
          <a className="font-bold text-lg">Josh Larson</a>
        </Link>

        <nav>
          <NavItem href="/posts">Posts</NavItem>
          <NavItem href="/archives">Archives</NavItem>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

function NavItem({ href, children }) {
  return (
    <Link href={href}>
      <a className="p-2 hover:bg-gray-200 ml-4">{children}</a>
    </Link>
  );
}
