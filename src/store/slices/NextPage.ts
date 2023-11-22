import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  haveNext: false,
};

export const nextPageSlice = createSlice({
  name: 'nextPage',
  initialState,
  reducers: {
    setHaveNext: (state, action: PayloadAction<boolean>) => {
      state.haveNext = action.payload;
    },
  },
});

export const { setHaveNext } = nextPageSlice.actions;

export default nextPageSlice.reducer;
