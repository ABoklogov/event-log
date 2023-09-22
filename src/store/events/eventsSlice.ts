import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from 'store';
import Event from 'interfaces/Events.interface';

interface EventsState {
  items: Event[];
  isLoading: boolean;
  error: string;

  itemsSearch: Event[];
  loadingSearch: boolean;
  search: boolean;
}

const initialState: EventsState = {
  items: [],
  isLoading: false,
  error: '',

  itemsSearch: [], // весь массив для поиска
  loadingSearch: false,
  search: false,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => ({
      ...state,
      items: [...action.payload],
      search: false,
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
    setSearchEvents: (state, action: PayloadAction<Event[]>) => ({
      ...state,
      items: [...action.payload],
      search: true,
    }),
    setArraySearchEvents: (state, action: PayloadAction<Event[]>) => ({
      ...state,
      itemsSearch: [...action.payload],
    }),
  },
});

export const {
  setEvents,
  loadingSetEvents,
  errorSetEvents,
  setSearchEvents,
  setArraySearchEvents,
} = eventsSlice.actions;