"use client";
import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import type { DayPlan } from '@/types/itinerary';

export default function ItineraryTimeline({
  days,
  onReorder
}: {
  days: DayPlan[];
  onReorder?: (days: DayPlan[]) => void;
}) {
  // Convert days to items with IDs for DnD
  const [items, setItems] = useState(() => days.map((d) => ({ id: nanoid(), ...d })));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    onReorder?.(newItems.map(({ id, ...rest }) => rest));
  }

  return (
    <div className="space-y-4">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 border rounded-xl bg-white dark:bg-neutral-800 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-lg text-primary dark:text-neutral-50">
                  Day {idx + 1} – {item.city}
                </h4>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  ${item.hotel?.price.toFixed(0) ?? '--'} / night
                </span>
              </div>
              {item.hotel && (
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Stay at {item.hotel.name} ({item.hotel.rating.toFixed(1)}★)
                </p>
              )}
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                {item.activities.map((act) => (
                  <li key={act}>{act}</li>
                ))}
              </ul>
              {item.notes && (
                <p className="mt-2 text-xs italic text-neutral-500 dark:text-neutral-400">{item.notes}</p>
              )}
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}