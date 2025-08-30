import '@/styles/globals.css';
import '@/styles/theme.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Sri Lanka AI Travel Planner',
    template: '%s | Sri Lanka Planner'
  },
  description:
    'AI‑powered itinerary planning for Sri Lanka. Find the best hotels and create personalised travel plans with real‑time pricing from Agoda, Booking.com and Airbnb.',
  metadataBase: new URL('https://your-domain.com')
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}