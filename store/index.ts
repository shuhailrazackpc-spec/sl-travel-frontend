import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import sessionReducer from './sessionSlice';
import itineraryReducer from './itinerarySlice';
import affiliateReducer from './affiliateSlice';

/**
 * The Redux store definition for the travel planner frontend.  Slices are
 * defined in separate files to keep concerns isolated.  The store is
 * created without devTools or middleware overrides to keep the
 * configuration straightforward.  Additional slices can be added as
 * needed for new features (e.g. user preferences, analytics).
 */
export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    session: sessionReducer,
    itinerary: itineraryReducer,
    affiliate: affiliateReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;