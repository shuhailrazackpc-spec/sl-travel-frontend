import Link from 'next/link';
import clsx from 'clsx';

export type HotelCardProps = {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  source: 'AGODA' | 'BOOKING' | 'AIRBNB' | 'LOCAL';
  imageUrl?: string;
  onSelect?: () => void;
};

const sourceLabels: Record<HotelCardProps['source'], string> = {
  AGODA: 'Agoda',
  BOOKING: 'Booking.com',
  AIRBNB: 'Airbnb',
  LOCAL: 'Local'
};

const sourceColours: Record<HotelCardProps['source'], string> = {
  AGODA: 'bg-blue-500',
  BOOKING: 'bg-indigo-600',
  AIRBNB: 'bg-rose-500',
  LOCAL: 'bg-emerald-500'
};

export default function HotelCard({ id, name, location, price, rating, source, imageUrl, onSelect }: HotelCardProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow bg-white dark:bg-neutral-800">
      <Link href={`/hotel/${id}`} className="block h-40 bg-neutral-100 dark:bg-neutral-700 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl || '/placeholder_light_gray_block.png'}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-medium text-primary dark:text-neutral-50">{name}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{location}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-primary dark:text-neutral-50 font-semibold">${price.toFixed(0)}</span>
          <span className="text-sm text-yellow-500">{rating.toFixed(1)}★</span>
        </div>
        <span
          className={clsx(
            'mt-1 inline-block px-2 py-1 text-xs font-medium text-white rounded',
            sourceColours[source]
          )}
        >
          {sourceLabels[source]}
        </span>
      </div>
      {onSelect && (
        <button
          onClick={onSelect}
          className="m-4 mt-0 px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
        >
          Select
        </button>
      )}
    </div>
  );
}