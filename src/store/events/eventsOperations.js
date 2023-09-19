import { getEvents } from "services/api";
import {
  setEvents,
  loadingSetEvents,
  errorSetEvents,
} from './eventsSlice';

export const fetchEvents = () => async (dispatch, getState) => {
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

        console.log(data);

        dispatch(setEvents(data));
      };
    };
  } catch (error) {
    dispatch(loadingSetEvents(false));
    dispatch(errorSetEvents(error.message));
    console.log(error.message);
  };
};