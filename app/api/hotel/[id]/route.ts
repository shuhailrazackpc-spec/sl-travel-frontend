import type { NextRequest } from 'next/server';

/**
 * Proxy or mock handler for single hotel details.
 *
 * If `NEXT_PUBLIC_BACKEND_URL` is set, the request is proxied to
 * `${BACKEND_URL}/v1/hotels/{id}`. The `x-api-key` header is forwarded if
 * defined. If no backend exists, the hotel is retrieved from the local
 * `mock/hotels.json` dataset.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const id = params.id;
  if (backend) {
    const endpoint = `${backend.replace(/\/$/, '')}/v1/hotels/${id}`;
    const headers: Record<string, string> = {};
    if (apiKey) headers['x-api-key'] = apiKey;
    const response = await fetch(endpoint, { headers });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // load from mock data
  const { default: hotels } = await import('../../../../mock/hotels.json');
  const hotel = (hotels as any[]).find((h) => String(h.id) === id);
  if (!hotel) {
    return new Response(JSON.stringify({ error: 'Hotel not found' }), { status: 404 });
  }
  return new Response(JSON.stringify(hotel), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}