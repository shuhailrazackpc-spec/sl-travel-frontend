import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AffiliateState {
  /**
   * The currently selected booking provider for the price comparison.  Can
   * be one of 'AGODA', 'BOOKING', 'AIRBNB' or undefined meaning no
   * preference.  Selecting a provider could influence deep link
   * generation on the hotel detail page.
   */
  provider?: 'AGODA' | 'BOOKING' | 'AIRBNB';
}

const initialState: AffiliateState = {};

const affiliateSlice = createSlice({
  name: 'affiliate',
  initialState,
  reducers: {
    setProvider(state, action: PayloadAction<'AGODA' | 'BOOKING' | 'AIRBNB' | undefined>) {
      state.provider = action.payload;
    }
  }
});

export const { setProvider } = affiliateSlice.actions;
export default affiliateSlice.reducer;