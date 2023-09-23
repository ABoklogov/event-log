import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import Event from 'interfaces/Events.interface';

interface EventsState {
  items: Event[];
  isLoading: boolean;
  error: string;

  querySearch: string;
  search: boolean;
}

const initialState: EventsState = {
  items: [],
  isLoading: false,
  error: '',

  querySearch: '',
  search: false,
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

    // поиск
    removeSearch: (state) => ({
      ...state,
      querySearch: '',
      search: false,
    }),
    setQuerySearch: (state, action: PayloadAction<string>) => ({
      ...state,
      querySearch: action.payload,
      search: true,
    }),
  },
});

export const {
  setEvents,
  loadingSetEvents,
  errorSetEvents,
  removeSearch,
  setQuerySearch,
} = eventsSlice.actions;