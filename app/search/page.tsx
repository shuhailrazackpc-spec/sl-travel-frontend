"use client";
import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useHotels } from '@/lib/api';
import FiltersPanel, { Filters } from '@/components/FiltersPanel';
import HotelCard from '@/components/HotelCard';
import Map from '@/components/Map';

/**
 * Search results page.  Allows the user to view hotels in a selected city
 * with optional filters for rating and price.  Results can be sorted
 * locally and displayed in either a grid or list.  A map view is also
 * available when toggled on.  Query parameters persist the filter
 * values in the URL.
 */
export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Read filters from the query string
  const city = searchParams.get('city') ?? '';
  const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const pageSize = searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 10;
  const sort = searchParams.get('sort') ?? 'price';
  const view = searchParams.get('view') ?? 'grid';

  // Fetch hotels with React Query.  Do not fetch until a city is provided.
  const { data, isLoading, error } = useHotels({
    city,
    minRating,
    maxPrice,
    page,
    pageSize
  });

  // Local state for sort and view toggles
  const [selectedSort, setSelectedSort] = useState(sort);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>(view as any as
    'grid' | 'list' | 'map'
  );

  // When sort changes update the URL to persist choice
  const updateQuery = (params: Record<string, string | undefined>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    router.push(`/search?${next.toString()}`);
  };

  const handleFiltersApply = (f: Filters) => {
    updateQuery({
      minRating: f.minRating ? String(f.minRating) : undefined,
      maxPrice: f.maxPrice ? String(f.maxPrice) : undefined,
      page: '1'
    });
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    updateQuery({ sort: value });
  };

  const handleViewChange = (value: 'grid' | 'list' | 'map') => {
    setViewMode(value);
    updateQuery({ view: value });
  };

  // Derive sorted items on the client.  When sort is 'rating' sort descending; 'price' ascending.
  const sortedItems = useMemo(() => {
    if (!data) return [] as any;
    const items = [...data.items];
    if (selectedSort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'price') {
      items.sort((a, b) => a.price - b.price);
    }
    return items;
  }, [data, selectedSort]);

  // Render
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-primary dark:text-neutral-50">
        Hotels in {city || '…'}
      </h1>
      {/* Filters + Sort + View Toggles */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <FiltersPanel value={{ minRating, maxPrice }} onChange={handleFiltersApply} />
        <div className="flex items-center gap-4">
          {/* Sort dropdown */}
          <label className="text-sm font-medium text-primary dark:text-neutral-50">Sort by:</label>
          <select
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-800 text-sm"
          >
            <option value="price">Price (asc)</option>
            <option value="rating">Rating (desc)</option>
          </select>
          {/* View toggles */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleViewChange('grid')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'grid' ? 'bg-accent text-white' : 'bg-white dark:bg-neutral-700 text-primary dark:text-neutral-50 border border-neutral-300 dark:border-neutral-600'}`}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => handleViewChange('list')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-white dark:bg-neutral-700 text-primary dark:text-neutral-50 border border-neutral-300 dark:border-neutral-600'}`}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => handleViewChange('map')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'map' ? 'bg-accent text-white' : 'bg-white dark:bg-neutral-700 text-primary dark:text-neutral-50 border border-neutral-300 dark:border-neutral-600'}`}
            >
              Map
            </button>
          </div>
        </div>
      </div>
      {/* Results / Error / Loading */}
      {isLoading && <div>Loading hotels…</div>}
      {error && <div className="text-red-600">Failed to load hotels: {error.message}</div>}
      {!isLoading && data && viewMode !== 'map' && (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
              : 'flex flex-col gap-4'
          }
        >
          {sortedItems.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              location={hotel.location}
              price={hotel.price}
              rating={hotel.rating}
              source={hotel.source}
            />
          ))}
          {sortedItems.length === 0 && <div>No hotels found.</div>}
        </div>
      )}
      {!isLoading && data && viewMode === 'map' && (
        <div className="h-[60vh]">
          <Map hotels={data.items} />
        </div>
      )}
    </div>
  );
}