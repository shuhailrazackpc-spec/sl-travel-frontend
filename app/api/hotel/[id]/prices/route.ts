import type { NextRequest } from 'next/server';

/**
 * Stub handler for price comparison data.  Queries the backend if available
 * otherwise returns an empty comparison result. Query params for checkin,
 * checkout and guests are passed through to the backend.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const id = params.id;
  const url = new URL(req.url);
  const qs = url.searchParams.toString();
  if (backend) {
    const endpoint = `${backend.replace(/\/$/, '')}/v1/hotels/${id}/prices${qs ? `?${qs}` : ''}`;
    const headers: Record<string, string> = {};
    if (apiKey) headers['x-api-key'] = apiKey;
    const response = await fetch(endpoint, { headers });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // return stubbed prices: no prices available so deep links can be used
  return new Response(JSON.stringify({ prices: [] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}