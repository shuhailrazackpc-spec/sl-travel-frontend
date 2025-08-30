export type HotelSource = 'AGODA' | 'BOOKING' | 'AIRBNB' | 'LOCAL';

/**
 * Basic hotel record returned from the API or mock dataset.  A `Hotel` represents
 * a single property in a given city.  Latitude/longitude are optional and
 * provided when map data is available.  The `source` field indicates which
 * provider returned the record.  Local records use "LOCAL".
 */
export interface Hotel {
  /** Unique identifier for the hotel.  Generated when using the mock dataset. */
  id: string;
  /** Human‑readable name (e.g. "Palm Villa Mirissa"). */
  name: string;
  /** City or region this hotel belongs to (e.g. "Mirissa"). */
  location: string;
  /** Latitude in decimal degrees (optional). */
  lat?: number;
  /** Longitude in decimal degrees (optional). */
  lng?: number;
  /** Price per night in the selected currency. */
  price: number;
  /** Rating out of five stars. */
  rating: number;
  /** Optional list of amenity strings (e.g. ["WiFi", "Pool", "Breakfast"]). */
  amenities?: string[];
  /** Optional array of image URLs for use in the gallery. */
  images?: string[];
  /** Data source – one of the affiliate providers or LOCAL for our own dataset. */
  source: HotelSource;
}

/**
 * Response shape returned by the hotel search API.  The `items` array
 * contains the hotels for the current page.  Pagination information is
 * included via the `page`, `pageSize` and `total` fields.
 */
export interface HotelSearchResponse {
  items: Hotel[];
  page: number;
  pageSize: number;
  total: number;
}