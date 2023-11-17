import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RespParam } from '../../types/types';

const initialState: RespParam = {
  searchValue: '',
  page: '1',
  limit: '10',
};

export const respParamSlice = createSlice({
  name: 'respParam',
  initialState,
  reducers: {
    setRespParam: (state, action: PayloadAction<RespParam>) => {
      const { searchValue, page, limit } = action.payload;
      if (searchValue) state.searchValue = searchValue;
      if (page) state.page = page;
      if (limit) state.limit = limit;
    },
  },
});

export const { setRespParam } = respParamSlice.actions;

export default respParamSlice.reducer;
