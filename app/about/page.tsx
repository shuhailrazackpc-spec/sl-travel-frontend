/**
 * About page providing information about the Sri Lanka travel platform.
 */
export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">About Us</h1>
      <p>
        We are passionate about helping travelers explore the wonders of Sri Lanka through
        personalised, AI‑powered itineraries. Our mission is to make trip planning effortless
        by combining local expertise with the latest technology.
      </p>
      <p>
        This platform aggregates accommodation options from major providers like Agoda,
        Booking.com and Airbnb, together with a curated local hotel dataset. The itinerary
        planner leverages AI to tailor your trip based on your interests, budget and
        preferred pace. All recommendations are unbiased; if you book through our links we
        may earn a small commission at no extra cost to you.
      </p>
    </main>
  );
}