"use client";
import { useState } from 'react';
import { usePlan } from '@/lib/api';
import { PlanRequest, PlanResponse } from '@/types/itinerary';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import { toCurrency } from '@/lib/currency';

const INTERESTS = ['Surfing', 'Heritage', 'Wildlife', 'Hiking', 'Food', 'Nightlife'];

/**
 * Planner page allows users to configure their trip preferences and
 * generate an AI‑driven itinerary.  Once generated the plan is
 * displayed in a timeline where users can review the suggested
 * activities and lodging.  An export button lets users download the
 * itinerary as JSON for now (PDF can be added later).  Drag and drop
 * functionality is stubbed until a full integration with dnd-kit is
 * provided.
 */
export default function PlannerPage() {
  const [destination, setDestination] = useState('Sri Lanka');
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState(500);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Surfing', 'Heritage']);
  const [travelerType, setTravelerType] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [varyHotels, setVaryHotels] = useState<boolean>(false);
  const [seed, setSeed] = useState<number | undefined>(undefined);

  const planMutation = usePlan();
  const plan = planMutation.data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: PlanRequest = {
      destination,
      days,
      budget,
      interests: selectedInterests,
      travelerType: travelerType || undefined,
      currency: currency || undefined,
      varyHotels,
      seed
    };
    planMutation.mutate(payload);
  };

  const handleInterestToggle = (i: string) => {
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const handleExport = () => {
    if (!plan) return;
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'itinerary.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-primary dark:text-neutral-50">Itinerary Planner</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Destination</span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-700"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Days</span>
            <input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-700"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Budget</span>
            <input
              type="number"
              min={0}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-700"
            />
          </label>
        </div>
        <div>
          <span className="text-sm font-medium">Interests</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {INTERESTS.map((int) => {
              const active = selectedInterests.includes(int);
              return (
                <button
                  key={int}
                  type="button"
                  onClick={() => handleInterestToggle(int)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    active
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white dark:bg-neutral-700 text-primary dark:text-neutral-50 border-neutral-300 dark:border-neutral-600'
                  }`}
                >
                  {int}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={varyHotels}
              onChange={(e) => setVaryHotels(e.target.checked)}
            />
            <span className="text-sm">Vary hotels across cities</span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Traveller type</span>
            <input
              type="text"
              value={travelerType}
              onChange={(e) => setTravelerType(e.target.value)}
              className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-700"
              placeholder="Solo, Couple, Family..."
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Currency</span>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-700"
              placeholder="USD"
            />
          </label>
        </div>
        <div className="flex gap-4 items-end">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Seed (optional)</span>
            <input
              type="number"
              value={seed ?? ''}
              onChange={(e) => setSeed(e.target.value === '' ? undefined : Number(e.target.value))}
              className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-700"
            />
          </label>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-accent text-white font-medium hover:bg-opacity-90 focus:ring-2 focus:ring-accent"
            disabled={planMutation.isPending}
          >
            {planMutation.isPending ? 'Generating…' : 'Generate'}
          </button>
        </div>
      </form>
      {/* Render plan if available */}
      {plan && (
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary dark:text-neutral-50">Route</h2>
            <div className="flex flex-wrap gap-2">
              {plan.route.map((stop, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-sm text-primary dark:text-neutral-50"
                >
                  {stop.city} ×{stop.nights}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary dark:text-neutral-50">Itinerary</h2>
            {/* Use stubbed ItineraryTimeline component for drag and drop */}
            <ItineraryTimeline days={plan.days} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary dark:text-neutral-50">Totals</h2>
            <div className="flex flex-col gap-1 text-sm text-primary dark:text-neutral-50">
              <span>Lodging: {toCurrency(plan.totals.lodging, currency)}</span>
              <span>Non‑lodging: {toCurrency(plan.totals.nonLodging, currency)}</span>
              <span>Total: {toCurrency(plan.totals.trip, currency)} / Budget {toCurrency(plan.totals.budget, currency)}</span>
              {plan.totals.overBudget && <span className="text-red-600">Over budget</span>}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary"
              onClick={handleExport}
            >
              Export JSON
            </button>
            {/* Placeholder for share button */}
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-neutral-700 text-white hover:bg-neutral-600 focus:ring-2 focus:ring-neutral-700"
              onClick={() => {
                if (!plan) return;
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard');
              }}
            >
              Share plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}