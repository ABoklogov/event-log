import { Dispatch } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import Event from 'interfaces/Events.interface';
import { getEvents } from "services/api";
import {
  setEvents,
  loadingSetEvents,
  errorSetEvents,
} from './eventsSlice';

// запись в локальное хранилище
const setLocalStorage = (value: Event[]) => {
  const string = JSON.stringify(value);
  localStorage.setItem('events', string);
};

// получение из локального хранилища
const getLocalStorage = () => {
  const string = localStorage.getItem('events');
  return string ? JSON.parse(string) : null;
};

export const fetchEvents = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const { events } = getState();

  try {
    if (events.items.length > 0) {
      return
    } else {
      dispatch(loadingSetEvents(true));
      // получаем данные из локального хранилища и записываем их в state
      const localEvents = getLocalStorage();

      if (localEvents === null) {
        const data = await getEvents();

        if (data === undefined) {
          throw new Error('Server Error!');
        } else {
          dispatch(loadingSetEvents(false));
          dispatch(errorSetEvents(''));

          dispatch(setEvents(data));
          setLocalStorage(data);
        };
      } else {
        dispatch(loadingSetEvents(false));
        dispatch(errorSetEvents(''));

        dispatch(setEvents(localEvents));
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

  dispatch(setEvents(totalEvents));
  setLocalStorage(totalEvents);
};