"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ThemeToggle';

/**
 * Account page stub. This page demonstrates where user settings,
 * saved itineraries and bookings would appear once authentication is
 * integrated. A sign-in modal is simulated with a simple state toggle.
 */
export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  return (
    <main className="space-y-4 max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold">My Account</h1>
      {!loggedIn ? (
        <div className="space-y-4">
          <p>You are not signed in. Sign in to manage your itineraries and preferences.</p>
          <button
            onClick={() => setLoggedIn(true)}
            className="rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-400"
          >
            Sign in (mock)
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <p>Welcome back! Here you will be able to view and manage your saved itineraries, wishlists and bookings.</p>
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold mb-2">Saved Itineraries</h2>
            <p className="text-sm text-neutral-500">No itineraries saved yet. Generate a plan and click save to store it here.</p>
          </div>
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold mb-2">Wishlists</h2>
            <p className="text-sm text-neutral-500">Your wishlists will appear here when you start bookmarking hotels or destinations.</p>
          </div>
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold mb-2">Account Settings</h2>
            <p className="text-sm text-neutral-500">Profile, currency, language and notification preferences will be configurable here.</p>
          </div>
          <button
            onClick={() => setLoggedIn(false)}
            className="rounded-xl bg-neutral-200 dark:bg-neutral-700 px-4 py-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            Sign out
          </button>
        </div>
      )}
    </main>
  );
}