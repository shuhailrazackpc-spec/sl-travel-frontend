"use client";
import { useState } from 'react';

export type Filters = {
  minRating?: number;
  maxPrice?: number;
};

export default function FiltersPanel({ value, onChange }: { value: Filters; onChange: (f: Filters) => void }) {
  const [local, setLocal] = useState<Filters>(value);

  const handleApply = () => {
    onChange(local);
  };
  return (
    <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
      <h3 className="text-lg font-medium mb-2">Filters</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Minimum rating</label>
          <input
            type="number"
            min={0}
            max={5}
            step={0.1}
            value={local.minRating ?? ''}
            onChange={(e) => setLocal({ ...local, minRating: e.target.value === '' ? undefined : Number(e.target.value) })}
            className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-800"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Max price (USD/night)</label>
          <input
            type="number"
            min={0}
            value={local.maxPrice ?? ''}
            onChange={(e) => setLocal({ ...local, maxPrice: e.target.value === '' ? undefined : Number(e.target.value) })}
            className="rounded-lg border border-neutral-300 dark:border-neutral-600 px-3 py-2 bg-white dark:bg-neutral-800"
          />
        </div>
        <button
          type="button"
          onClick={handleApply}
          className="self-start mt-2 px-4 py-2 rounded-lg bg-accent text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Apply
        </button>
      </div>
    </div>
  );
}