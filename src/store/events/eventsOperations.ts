import { Dispatch } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import Event from 'interfaces/Events.interface';
import { getEvents } from "services/api";
import { setLocalStorage } from 'helpers/setLocalStorage';
import { getLocalStorage } from 'helpers/getLocalStorage';
import {
  setEvents,
  loadingSetEvents,
  errorSetEvents,
} from './eventsSlice';

// получение всех задач
export const fetchEvents = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadingSetEvents(true));
    // получаем данные из локального хранилища и записываем их в state
    const localEvents = getLocalStorage<Event[]>('events');

    if (localEvents === null) {
      const data = await getEvents();

      if (data === undefined) {
        throw new Error('Server Error!');
      } else {
        dispatch(loadingSetEvents(false));
        dispatch(errorSetEvents(''));

        dispatch(setEvents(data));
        setLocalStorage(data, 'events');
      };
    } else {
      dispatch(loadingSetEvents(false));
      dispatch(errorSetEvents(''));

      dispatch(setEvents(localEvents));
    };
  } catch (error) {
    if (error instanceof Error) {
      dispatch(loadingSetEvents(false));
      dispatch(errorSetEvents(error.message));
      console.log(error.message);
    };
  };
};

// пометка о прочтении
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
  setLocalStorage(totalEvents, 'events');
};
