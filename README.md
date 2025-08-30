# Sri Lanka Travel Planner Frontend

This repository contains a Next.js (App Router) + TypeScript frontend for a Sri‑Lanka–focused AI travel planning platform.  The UI is intentionally minimal and image‑first with a premium feel, and integrates with a separate FastAPI backend via environment variables.  The project is mobile‑first, accessible (WCAG AA) and prepared for deployment on Vercel.

## Features

* **App Router with TypeScript** – Uses the latest Next.js 14 App Router API for file‑based routing and server components where appropriate.
* **TailwindCSS** – All styling is implemented with Tailwind and custom theme tokens reflecting the brand palette.
* **React Query** – Remote data fetching and caching for hotels, itineraries and price comparisons.
* **Redux Toolkit** – Manages client‑side state for session/auth, filters, itinerary drafts and affiliate selections.
* **Drag and drop itinerary** – Built on `@dnd-kit` so users can reorder activities and swap hotels on the planner page.
* **Google Maps with Leaflet fallback** – The `Map` component reads your API key at runtime and falls back to OpenStreetMap if absent.
* **Affiliate integrations** – The `PriceCompare` component builds deep links to Agoda, Booking.com and Airbnb using tracking IDs pulled from environment variables.
* **Accessibility & SEO** – Semantic HTML with focus traps, keyboard interactions, high colour contrast and JSON‑LD schema for Hotels and Trips.
* **Mock mode** – If `NEXT_PUBLIC_BACKEND_URL` is unset the app will serve data from local JSON files under `/mock`.

## Quick start

1. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Copy environment example**

   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and provide your backend URL, Google Maps/Places keys and affiliate tracking IDs.  For local development you can leave `NEXT_PUBLIC_BACKEND_URL` empty to enable mock mode.

3. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   Open <http://localhost:3000> in your browser to see the app.

4. **Build for production**

   ```bash
   pnpm build && pnpm start
   ```

## Deployment on Vercel

To deploy to Vercel, link this repository and set the following environment variables in the Vercel dashboard:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the FastAPI backend (e.g. `https://your-api.onrender.com`). Leave unset for mock mode. |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps JavaScript API key for interactive maps. |
| `NEXT_PUBLIC_PLACES_KEY` | Google Places API key for autocomplete. |
| `NEXT_PUBLIC_AFFILIATE_BOOKING_ID` | Your Booking.com affiliate ID for deep links. |
| `NEXT_PUBLIC_AFFILIATE_AGODA_ID` | Your Agoda affiliate ID. |
| `NEXT_PUBLIC_AFFILIATE_AIRBNB_ID` | Your Airbnb affiliate ID. |
| `NEXT_PUBLIC_OPENAI_ENABLED` | Enable the OpenAI itinerary generator (true/false). |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Enable Plausible/Umami tracking (true/false). |

Vercel will detect the Next.js project automatically.  On the first deployment you can leave the `BACKEND_URL` empty to verify the mock mode, then point it at your live API once ready.

## Project structure

```
sl-travel-frontend/
├─ app/               # File‑system routed pages and API proxies
│  ├─ layout.tsx      # Root layout with theme & providers
│  ├─ page.tsx        # Landing page
│  ├─ marketing/page.tsx
│  ├─ search/page.tsx # Results with filters & map
│  ├─ hotel/[id]/page.tsx   # Hotel details
│  ├─ planner/page.tsx      # AI itinerary planner
│  ├─ account/page.tsx      # Profile & saved trips
│  └─ api/          # Route handlers that proxy to backend or return mocks
│     ├─ plan/route.ts
│     └─ hotels/route.ts
├─ components/       # Reusable UI components (SearchBar, FiltersPanel, etc.)
├─ lib/              # Fetch wrappers, currency helpers, SEO helpers, etc.
├─ store/            # Redux slices and Zustand stores
├─ types/            # TypeScript type definitions for API models
├─ styles/           # Global CSS and Tailwind config
├─ mock/             # Local JSON data used in mock mode
├─ .env.example      # Example environment variables
└─ README.md         # This file
```

## Extending

* **Switch providers** – To use the real backend instead of mock mode, set `NEXT_PUBLIC_BACKEND_URL` in your `.env.local`.  The `lib/api.ts` module will automatically include the `x-api-key` header if provided.
* **Add new pages** – Create a new folder under `app/` and export a default React component.  For dynamic routes, wrap the segment in square brackets (e.g. `app/hotel/[id]/page.tsx`).
* **Integrate Google Maps** – Provide your `NEXT_PUBLIC_GOOGLE_MAPS_KEY` and `NEXT_PUBLIC_PLACES_KEY`.  The `Map` component will then load the Maps SDK; if no key is present it falls back to a Leaflet map using OpenStreetMap tiles.
* **Affiliate links** – Set your affiliate IDs in the environment.  The `PriceCompare` component will build deep links with the correct tracking parameters.  See `lib/affiliates.ts` for details.

## License

This project is provided as‑is for demonstration purposes.  See LICENSE for details.