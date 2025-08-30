import type { NextRequest } from 'next/server';

/**
 * Proxy or mock implementation for itinerary planning.
 *
 * When `NEXT_PUBLIC_BACKEND_URL` is configured, POST bodies are forwarded
 * to `${BACKEND_URL}/v1/plan`. Headers such as `x-api-key` are passed when
 * available. This allows the frontend to call the API without exposing
 * cross-origin restrictions.
 *
 * If no backend is configured, a local mock plan (mock/plan.json) is
 * returned. This provides a working planner experience during development
 * without the backend.
 */
export async function POST(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const body = await req.json();
  if (backend) {
    const endpoint = `${backend.replace(/\/$/, '')}/v1/plan`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (apiKey) headers['x-api-key'] = apiKey;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // Return mock response if no backend
  const { default: plan } = await import('../../../mock/plan.json');
  return new Response(JSON.stringify(plan), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}