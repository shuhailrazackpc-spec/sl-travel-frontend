"use client";

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from '@/store';

/**
 * Global providers wrapper for React Query, Redux and theme context.
 * See `/store` for slice definitions.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}