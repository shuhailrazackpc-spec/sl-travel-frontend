"use client";
import { useParams } from 'next/navigation';
import { useHotel, useHotels } from '@/lib/api';
import PriceCompare from '@/components/PriceCompare';
import Map from '@/components/Map';
import HotelCard from '@/components/HotelCard';

/**
 * Dynamic hotel detail page.  Displays a gallery, summary info,
 * amenities, price comparison and similar hotels.  Data is fetched via
 * React Query; while loading, simple placeholders are shown.  Deep
 * links are constructed using the `PriceCompare` component.
 */
export default function HotelDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { data: hotel, isLoading, error } = useHotel(id);
  // Fetch similar hotels in the same location once we know the location
  const { data: similar } = useHotels({ city: hotel?.location, page: 1, pageSize: 3 });
  if (!id) {
    return <div className="p-6">Missing hotel ID.</div>;
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
      {isLoading && <div>Loading hotel details…</div>}
      {error && <div className="text-red-600">Failed to load hotel.</div>}
      {hotel && (
        <>
          {/* Gallery */}
          <div className="grid md:grid-cols-3 gap-2 mb-6">
            {hotel.images && hotel.images.length > 0 ? (
              hotel.images.slice(0, 3).map((img, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={idx}
                  src={img}
                  alt={`${hotel.name} photo ${idx + 1}`}
                  className="w-full h-60 object-cover rounded-xl"
                />
              ))
            ) : (
              <div className="h-60 bg-neutral-200 dark:bg-neutral-700 rounded-xl flex items-center justify-center col-span-3">
                No images available
              </div>
            )}
          </div>
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-primary dark:text-neutral-50">
            {hotel.name}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-2">{hotel.location}</p>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            {hotel.rating.toFixed(1)}★ • ${hotel.price.toFixed(0)} / night
          </p>
          {/* Amenities */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2 text-primary dark:text-neutral-50">Amenities</h2>
              <ul className="flex flex-wrap gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                {hotel.amenities.map((a) => (
                  <li
                    key={a}
                    className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Price comparison */}
          <div className="mb-6">
            <PriceCompare id={hotel.id} name={hotel.name} />
          </div>
          {/* Map */}
          {hotel.lat && hotel.lng && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2 text-primary dark:text-neutral-50">Location</h2>
              <div className="h-64">
                <Map hotels={[hotel]} />
              </div>
            </div>
          )}
          {/* Similar hotels */}
          {similar && similar.items.length > 1 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4 text-primary dark:text-neutral-50">
                Similar stays
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {similar.items
                  .filter((h) => h.id !== hotel.id)
                  .map((h) => (
                    <HotelCard
                      key={h.id}
                      id={h.id}
                      name={h.name}
                      location={h.location}
                      price={h.price}
                      rating={h.rating}
                      source={h.source}
                    />
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}