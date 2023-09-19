import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: '',
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, { payload }) => ({
      ...state,
      items: [...payload],
    }),
    // загрузка
    loadingSetEvents: (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }),
    // ошибка
    errorSetEvents: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
});

export const {
  setEvents,
  loadingSetEvents,
  errorSetEvents,
} = eventsSlice.actions;