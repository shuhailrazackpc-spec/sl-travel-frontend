"use client";
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPriceCompare } from '@/lib/api';
import { bookingLink, agodaLink, airbnbLink } from '@/lib/affiliates';

export default function PriceCompare({
  id,
  name,
  checkin,
  checkout,
  guests
}: {
  id: string;
  name: string;
  checkin?: string;
  checkout?: string;
  guests?: number;
}) {
  // Provide sensible defaults for checkin/checkout if not provided
  const today = new Date();
  const defaultCheckin = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    .toISOString()
    .split('T')[0];
  const defaultCheckout = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8)
    .toISOString()
    .split('T')[0];
  const queryKey = [
    'priceCompare',
    id,
    checkin || defaultCheckin,
    checkout || defaultCheckout,
    guests || 2
  ];
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      fetchPriceCompare({
        id,
        checkin: checkin || defaultCheckin,
        checkout: checkout || defaultCheckout,
        guests: guests || 2
      }),
    // Do not retry on error to avoid hitting unknown endpoints repeatedly
    retry: false
  });

  const providers = [
    { key: 'AGODA', label: 'Agoda', color: 'bg-blue-500', link: agodaLink(name) },
    { key: 'BOOKING', label: 'Booking.com', color: 'bg-indigo-600', link: bookingLink(name) },
    { key: 'AIRBNB', label: 'Airbnb', color: 'bg-rose-500', link: airbnbLink(name) }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-2 text-primary dark:text-neutral-50">Price comparison</h3>
      {isLoading && <div>Checking prices…</div>}
      {error && <div className="text-red-600 text-sm">Price information unavailable.</div>}
      <div className="flex flex-col md:flex-row gap-3">
        {providers.map((prov) => {
          const price = data?.find((p) => p.provider.toUpperCase() === prov.key)?.price;
          const url = data?.find((p) => p.provider.toUpperCase() === prov.key)?.url || prov.link;
          return (
            <a
              key={prov.key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-between border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 hover:shadow"
            >
              <span className={`px-2 py-1 rounded text-xs text-white ${prov.color}`}>{prov.label}</span>
              <span className="mt-2 text-sm font-medium text-primary dark:text-neutral-50">
                {price !== undefined ? `$${price.toFixed(0)}` : 'Check price'}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}