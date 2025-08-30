"use client";
import { useEffect, useState } from 'react';

/**
 * Placeholder Map component.  When a Google Maps key is provided via the
 * environment it could load the Maps JS SDK and render markers.  When no
 * key is present it simply displays a notice.  This component is lazy
 * loaded on the search page when the user toggles the map view.
 */
export default function Map({ hotels }: { hotels: any[] }) {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).google) {
      setIsGoogleLoaded(true);
    }
  }, []);

  if (!isGoogleLoaded) {
    return (
      <div className="flex items-center justify-center h-96 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
        Map will appear here when a valid Google Maps key is provided.
      </div>
    );
  }
  // TODO: Render Google map with markers; this is a stub
  return (
    <div className="h-96 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
      Google Map integration coming soon.
    </div>
  );
}