"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

/**
 * Search bar component used on the home page and header.  Allows users to
 * specify a destination, date range, guests and budget.  On submit it
 * redirects to `/search` with query parameters.
 */
export default function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState(2);
  const [budget, setBudget] = useState(0);
  // TODO: date range picker integration

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('city', destination);
    if (guests) params.set('guests', guests.toString());
    if (budget) params.set('maxPrice', budget.toString());
    router.push(`/search?${params.toString()}`);
  }
  return (
    <form onSubmit={handleSubmit} className={clsx('w-full flex flex-col gap-3', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Where to?"
          className="flex-1 rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Guests"
          className="w-24 rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
          value={guests}
          min={1}
          onChange={(e) => setGuests(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Budget (per night)"
          className="w-36 rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
          value={budget}
          min={0}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto self-end rounded-xl bg-accent text-white px-6 py-3 hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Search
      </button>
    </form>
  );
}