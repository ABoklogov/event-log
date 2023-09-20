import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from 'store';
import Event from 'interfaces/Events.interface';

interface EventsState {
  items: Event[];
  isLoading: boolean;
  error: string;
}

const initialState: EventsState = {
  items: [],
  isLoading: false,
  error: '',
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => ({
      ...state,
      items: [...action.payload],
    }),
    // загрузка
    loadingSetEvents: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
    // ошибка
    errorSetEvents: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const {
  setEvents,
  loadingSetEvents,
  errorSetEvents,
} = eventsSlice.actions;