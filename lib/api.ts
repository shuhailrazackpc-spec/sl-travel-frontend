import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import type { HotelSearchResponse, Hotel } from '@/types/hotel';
import type { PlanRequest, PlanResponse } from '@/types/itinerary';

/**
 * Internal helper to build the API base URL.  If the user sets
 * `NEXT_PUBLIC_BACKEND_URL`, requests will proxy through `/api` to the
 * backend; otherwise they will hit our mock API routes which return
 * static JSON.  On the client this will always resolve to `/api/...`.
 */
function getApiBase(): string {
  // For the browser we always call our Next.js API routes under /api.
  return '/api';
}

/**
 * Reads the API key from the environment.  When present, all requests
 * include an `x-api-key` header.  This mirrors the backend’s security
 * mechanism; leaving the key empty will disable the header.
 */
function getApiKey(): string | undefined {
  if (typeof window !== 'undefined') {
    // On the client, env variables are exposed via process.env.NEXT_PUBLIC_API_KEY
    return process.env.NEXT_PUBLIC_API_KEY;
  }
  return process.env.NEXT_PUBLIC_API_KEY;
}

/**
 * Generic fetch wrapper that adds headers and JSON handling.  When the
 * response status is not OK the promise will reject with an Error.
 */
async function request<T>(input: RequestInfo, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  const apiKey = getApiKey();
  if (init.body) headers['Content-Type'] = 'application/json';
  if (apiKey) headers['x-api-key'] = apiKey;
  const res = await fetch(input, { ...init, headers });
  if (!res.ok) {
    // Try to parse error body
    let message = res.statusText;
    try {
      const data = await res.json();
      message = data.message || message;
    } catch (e) {
      // ignore
    }
    throw new Error(message);
  }
  return (await res.json()) as T;
}

/**
 * Fetch a page of hotels matching the given filters.  Parameters that are
 * undefined will be omitted from the query string.  Returns a paginated
 * result with `items`, `page`, `pageSize` and `total` fields.
 */
export async function fetchHotels(params: {
  city?: string;
  minRating?: number;
  maxPrice?: number;
  amenities?: string;
  page?: number;
  pageSize?: number;
}): Promise<HotelSearchResponse> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });
  const base = getApiBase();
  const url = `${base}/hotels${query.toString() ? `?${query.toString()}` : ''}`;
  return request<HotelSearchResponse>(url);
}

/**
 * Fetch a single hotel by its id.  Returns a `Hotel` record or throws
 * if not found.
 */
export async function fetchHotel(id: string): Promise<Hotel> {
  const base = getApiBase();
  return request<Hotel>(`${base}/hotel/${encodeURIComponent(id)}`);
}

/**
 * Fetch price comparison data for a hotel.  The backend (or mock) will
 * normalise results from Booking.com, Agoda and Airbnb.  If no
 * information is available the returned array may be empty.
 */
export async function fetchPriceCompare(params: {
  id: string;
  checkin: string;
  checkout: string;
  guests: number;
}): Promise<{ provider: string; price: number; url: string }[]> {
  const { id, checkin, checkout, guests } = params;
  const base = getApiBase();
  const query = new URLSearchParams({ checkin, checkout, guests: String(guests) });
  return request<{ provider: string; price: number; url: string }[]>(
    `${base}/hotel/${encodeURIComponent(id)}/prices?${query.toString()}`
  );
}

/**
 * Submit an itinerary planning request.  Returns a full `PlanResponse`.
 */
export async function fetchPlan(body: PlanRequest): Promise<PlanResponse> {
  const base = getApiBase();
  return request<PlanResponse>(`${base}/plan`, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

/**
 * React Query hook to get hotels based on filters.  Query keys are
 * derived from the parameter object to enable caching and deduplication.
 */
export function useHotels(params: {
  city?: string;
  minRating?: number;
  maxPrice?: number;
  amenities?: string;
  page?: number;
  pageSize?: number;
}): UseQueryResult<HotelSearchResponse, Error> {
  return useQuery({
    queryKey: ['hotels', params],
    queryFn: () => fetchHotels(params),
    enabled: !!params.city // do not fetch until a city is provided
  });
}

/**
 * React Query hook to fetch a single hotel by id.
 */
export function useHotel(id: string | undefined): UseQueryResult<Hotel, Error> {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => fetchHotel(id as string),
    enabled: !!id
  });
}

/**
 * React Query mutation hook for generating a plan.  Useful on the planner
 * page where a submit button triggers the call.
 */
export function usePlan(): UseMutationResult<PlanResponse, Error, PlanRequest> {
  return useMutation((body: PlanRequest) => fetchPlan(body));
}