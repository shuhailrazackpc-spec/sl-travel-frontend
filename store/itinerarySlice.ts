import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PlanResponse, DayPlan } from '@/types/itinerary';

export interface DayOverride {
  day: number;
  hotelId: string;
}

export interface ItineraryState {
  /** The last fetched or edited plan. */
  plan: PlanResponse | null;
  /** Local overrides mapping day index to a new hotel id. */
  overrides: DayOverride[];
}

const initialState: ItineraryState = {
  plan: null,
  overrides: []
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    setPlan(state, action: PayloadAction<PlanResponse | null>) {
      state.plan = action.payload;
      state.overrides = [];
    },
    setOverride(state, action: PayloadAction<DayOverride>) {
      const existingIndex = state.overrides.findIndex((o) => o.day === action.payload.day);
      if (existingIndex >= 0) {
        state.overrides[existingIndex] = action.payload;
      } else {
        state.overrides.push(action.payload);
      }
    },
    clearOverrides(state) {
      state.overrides = [];
    }
  }
});

export const { setPlan, setOverride, clearOverrides } = itinerarySlice.actions;
export default itinerarySlice.reducer;