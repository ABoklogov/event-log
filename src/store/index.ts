import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { eventsSlice } from './events/eventsSlice';

export const store = configureStore({
  reducer: {
    [eventsSlice.name]: eventsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;