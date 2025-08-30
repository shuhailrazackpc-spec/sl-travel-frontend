import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  currency?: string;
  language?: string;
  interests?: string[];
}

export interface SessionState {
  user: UserProfile | null;
}

const initialState: SessionState = {
  user: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile | null>) {
      state.user = action.payload;
    }
  }
});

export const { setUser } = sessionSlice.actions;
export default sessionSlice.reducer;