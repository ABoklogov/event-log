import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface ViewState {
  value: 'table' | 'card';
};

const initialState: ViewState = {
  value: 'table',
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<'table' | 'card'>) => ({
      ...state,
      value: action.payload,
    }),
  },
});

export const { setView } = viewSlice.actions;