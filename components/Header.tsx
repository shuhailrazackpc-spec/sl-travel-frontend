"use client";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

/**
 * Global header with navigation links and theme toggle.
 */
export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search' },
    { href: '/planner', label: 'Planner' },
    { href: '/account', label: 'Account' },
    { href: '/about', label: 'About' }
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-semibold text-primary dark:text-neutral-50">
          Sri Lanka Planner
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'hover:text-accent transition-colors',
                pathname === href && 'text-accent'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}