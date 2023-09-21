import { Dispatch } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import Event from 'interfaces/Events.interface';
import { getEvents } from "services/api";
import {
  setEvents,
  loadingSetEvents,
  errorSetEvents,
} from './eventsSlice';

export const fetchEvents = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const { events } = getState();

  try {
    if (events.items.length > 0) {
      return
    } else {
      dispatch(loadingSetEvents(true));
      const data = await getEvents();

      if (data === undefined) {
        throw new Error('Server Error!');
      } else {
        dispatch(loadingSetEvents(false));
        dispatch(errorSetEvents(''));

        // console.log(data);

        dispatch(setEvents(data));
      };
    };
  } catch (error) {
    if (error instanceof Error) {
      dispatch(loadingSetEvents(false));
      dispatch(errorSetEvents(error.message));
      console.log(error.message);
    };
  };
};

export const readEvents = (eventsToRead: Event[]) => async (dispatch: Dispatch, getState: () => RootState) => {
  // console.log("🚀 ~ readEvents ~ eventsToRead:", eventsToRead)
  const { events } = getState();

  const totalEvents = events.items.map((stateEl) => {
    let newEl = stateEl;

    eventsToRead.forEach((findEl) => {
      if (findEl.id === stateEl.id) {
        newEl = Object.assign({}, stateEl, { read: true });
      };
    });
    return newEl;
  });
  console.log("🚀 ~ totalEvents ~ totalEvents:", totalEvents)

  dispatch(setEvents(totalEvents));
};