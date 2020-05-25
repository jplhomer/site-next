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
          <NavItem href="/glances">Glances</NavItem>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-12 py-8 px-4 max-w-4xl mx-auto text-center">
        <img
          className="rounded-full mb-4 w-20 h-20 mx-auto"
          src="https://unavatar.now.sh/jplhomer"
          alt="A photo of Josh"
        />
        <div className="mb-4">
          <Link href="/">
            <a className="font-bold text-lg">Josh Larson</a>
          </Link>
        </div>
        <div>
          <a className="mx-2" href="https://twitter.com/jplhomer">
            Twitter
          </a>
          <a className="mx-2" href="https://github.com/jplhomer">
            GitHub
          </a>
          <a className="mx-2" href="https://linkedin.com/in/jplhomer">
            LinkedIn
          </a>
          <a className="mx-2" href="https://instagram.com/jplhomer">
            Instagram
          </a>
        </div>
      </footer>
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