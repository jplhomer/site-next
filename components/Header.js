import useDarkMode from 'use-dark-mode';
import { useIsClient } from '@/lib/use-is-client';
import Link from 'next/link';
import { LightBulbIcon as Lightbulb, MoonIcon as Moon } from '@heroicons/react/outline';

export default function Header() {
  return (
    <header className="max-w-4xl mx-auto mb-4 flex items-center justify-between px-4 py-6">
      <Link href="/">
        <a className="font-bold text-lg">Josh Larson</a>
      </Link>

      <nav className="flex items-center">
        <NavItem href="/about">About</NavItem>
        <NavItem href="/posts">Posts</NavItem>
        <NavItem href="/glances">Glances</NavItem>
        <DarkModeToggle />
      </nav>
    </header>
  );
}

function DarkModeToggle() {
  const darkMode = useDarkMode(false, { classNameDark: 'dark' });
  const isClient = useIsClient();

  const iconClasses = 'w-5 h-5 inline-block';

  if (isClient) {
    return (
      <button
        className="inline-flex p-2 ml-2 md:ml-4 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={darkMode.toggle}
        aria-label="Toggle light and dark mode"
      >
        {darkMode.value ? <Lightbulb className={iconClasses} /> : <Moon className={iconClasses} />}
      </button>
    );
  }

  return <span className="p-2 ml-2">...</span>;
}

function NavItem({ href, children }) {
  return (
    <Link href={href}>
      <a className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ml-2 md:ml-4">{children}</a>
    </Link>
  );
}
