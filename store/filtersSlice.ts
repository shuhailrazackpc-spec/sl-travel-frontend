import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  city: string;
  minRating?: number;
  maxPrice?: number;
  amenities?: string;
  page: number;
  pageSize: number;
}

const initialState: FiltersState = {
  city: '',
  page: 1,
  pageSize: 10
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
      state.page = 1; // reset to first page when city changes
    },
    setMinRating(state, action: PayloadAction<number | undefined>) {
      state.minRating = action.payload;
      state.page = 1;
    },
    setMaxPrice(state, action: PayloadAction<number | undefined>) {
      state.maxPrice = action.payload;
      state.page = 1;
    },
    setAmenities(state, action: PayloadAction<string | undefined>) {
      state.amenities = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    resetFilters() {
      return initialState;
    }
  }
});

export const {
  setCity,
  setMinRating,
  setMaxPrice,
  setAmenities,
  setPage,
  setPageSize,
  resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;