import type { NextRequest } from 'next/server';

/**
 * Proxy or mock implementation for the hotels search endpoint.
 *
 * If `NEXT_PUBLIC_BACKEND_URL` is set, the request will be forwarded to
 * `${BACKEND_URL}/v1/hotels` with query parameters preserved. The `x-api-key`
 * header is passed through when defined in the environment.
 *
 * When no backend URL is configured, a local JSON dataset located in
 * `mock/hotels.json` is used. Basic filtering on city, minRating and maxPrice
 * is performed to mimic the backend API. Pagination is applied via `page`
 * and `pageSize` query parameters.
 */
export async function GET(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);

  // If a backend URL is available, forward the request
  if (backend) {
    const qs = params.toString();
    const endpoint = `${backend.replace(/\/$/, '')}/v1/hotels${qs ? `?${qs}` : ''}`;
    const headers: Record<string, string> = {};
    if (apiKey) headers['x-api-key'] = apiKey;
    const response = await fetch(endpoint, { headers });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Otherwise load local mock data
  const { default: hotels } = await import('../../../mock/hotels.json');
  const city = params.get('city');
  const minRating = params.get('minRating');
  const maxPrice = params.get('maxPrice');
  const page = parseInt(params.get('page') || '1', 10);
  const pageSize = parseInt(params.get('pageSize') || '20', 10);

  // Filter by city, rating and price
  let filtered = hotels as any[];
  if (city) {
    filtered = filtered.filter((h) =>
      h.location.toLowerCase().includes(city.toLowerCase()),
    );
  }
  if (minRating) {
    const min = parseFloat(minRating);
    filtered = filtered.filter((h) => h.rating >= min);
  }
  if (maxPrice) {
    const max = parseFloat(maxPrice);
    filtered = filtered.filter((h) => h.price <= max);
  }
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  const result = {
    items,
    page,
    page_size: pageSize,
    total,
  };
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}