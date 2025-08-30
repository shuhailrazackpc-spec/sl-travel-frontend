import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-sm bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
      <p className="mb-2">
        &copy; {year} Sri Lanka AI Travel Planner. Some links may be affiliate links and we may earn a commission.
      </p>
      <p>
        <Link href="/about" className="underline hover:text-accent">About</Link>{' | '}
        <Link href="/privacy" className="underline hover:text-accent">Privacy</Link>{' | '}
        <Link href="/terms" className="underline hover:text-accent">Terms</Link>{' | '}
        <Link href="/disclosure" className="underline hover:text-accent">Affiliate Disclosure</Link>
      </p>
    </footer>
  );
}