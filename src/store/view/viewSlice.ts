import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface ViewState {
  value: 'table' | 'card';
  sidebar: boolean;
};

const initialState: ViewState = {
  value: 'table',
  sidebar: false,
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    // вид карточек
    setView: (state, action: PayloadAction<'table' | 'card'>) => ({
      ...state,
      value: action.payload,
    }),
    // состояние сайдбара
    toggleSidbar: (state, action: PayloadAction<boolean>) => ({
      ...state,
      sidebar: action.payload,
    }),
  },
});

export const { setView, toggleSidbar } = viewSlice.actions;