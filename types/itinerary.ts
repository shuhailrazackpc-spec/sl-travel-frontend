import type { Hotel, HotelSource } from './hotel';

/**
 * PlanRequest defines the body sent to the itinerary planner API.  It
 * encapsulates the user’s preferences such as destination, number of days,
 * overall budget, list of interests and optional traveller information.
 */
export interface PlanRequest {
  destination: string;
  /** Number of travel days. */
  days: number;
  /** Total trip budget. */
  budget: number;
  /** Array of interests used to tailor the itinerary (e.g. surfing, heritage). */
  interests: string[];
  /** Optional traveller type (Solo, Couple, Family, etc.). */
  travelerType?: string;
  /** Optional currency code (e.g. USD, LKR). */
  currency?: string;
  /** If true the planner will try to vary hotels between stops. */
  varyHotels?: boolean;
  /** Optional seed to achieve deterministic plans. */
  seed?: number;
}

/**
 * Represents the lodging component for a day plan.  This is a subset of
 * `Hotel` tailored for inclusion within a day entry – it omits map
 * coordinates and images.
 */
export interface DayHotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  amenities?: string[];
  source: HotelSource;
}

/**
 * Defines a single day in the returned plan.  Each day belongs to a city
 * and can optionally include a selected hotel.  The `activities` list
 * contains free‑form strings, and `dailySpendEstimate` provides a
 * suggested amount for non‑lodging expenses.  `notes` can include any
 * additional commentary from the planner.
 */
export interface DayPlan {
  day: number;
  city: string;
  hotel?: DayHotel;
  activities: string[];
  dailySpendEstimate: number;
  notes?: string;
}

/**
 * Top level itinerary structure returned from the planning API.  The
 * `route` array contains the ordered stops and number of nights in each
 * city.  The `perNightBudget` is computed from the budget and days.  The
 * `days` array holds detailed entries for each day.  `recommendedHotels`
 * includes a shortlist of properties to consider.  The `totals` object
 * summarises the total cost and whether the trip is over budget.  Finally,
 * `fallbackLinks` contains deep links to affiliate sites if the API
 * fails to provide direct booking options.
 */
export interface PlanResponse {
  route: { city: string; nights: number }[];
  perNightBudget: number;
  days: DayPlan[];
  recommendedHotels: DayHotel[];
  totals: {
    lodging: number;
    nonLodging: number;
    trip: number;
    budget: number;
    overBudget: boolean;
  };
  fallbackLinks: {
    booking?: string;
    agoda?: string;
    airbnb?: string;
  };
}