import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export default function HomePage() {
  const featured = [
    {
      name: 'Galle Fort',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Ella',
      image:
        'https://images.unsplash.com/photo-1541427081543-e00c51c75a5a?auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Arugam Bay',
      image:
        'https://images.unsplash.com/photo-1518684079-0036312fd756?auto=format&fit=crop&w=800&q=60'
    }
  ];
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=1920&q=60)'
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-4 md:py-32 bg-black/50 dark:bg-black/60">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Plan your dream Sri Lanka adventure
          </h1>
          <p className="text-white text-lg md:text-xl mb-6 max-w-2xl">
            Discover hidden gems, craft personalised itineraries and compare real‑time prices across top booking sites.
          </p>
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </section>
      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary dark:text-neutral-50">Featured destinations</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((dest) => (
            <Link
              key={dest.name}
              href={`/search?city=${encodeURIComponent(dest.name)}`}
              className="group block overflow-hidden rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <div
                className="h-56 bg-cover bg-center" 
                style={{ backgroundImage: `url(${dest.image})` }}
              />
              <div className="p-4 bg-white dark:bg-neutral-800">
                <h3 className="text-lg font-medium text-primary dark:text-neutral-50 group-hover:text-accent">
                  {dest.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}