import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className="max-w-4xl mx-auto mb-12 flex items-center justify-between px-4 py-8">
        <Link href="/">
          <a className="font-bold text-lg">Josh Larson</a>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
