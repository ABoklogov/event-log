import { Dispatch } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { setLocalStorage } from 'helpers/setLocalStorage';
import { getLocalStorage } from 'helpers/getLocalStorage';
import { setView } from './viewSlice';

// получение view
export const calcTheView = () => async (dispatch: Dispatch) => {
  // получаем данные из локального хранилища
  const localView = getLocalStorage<'table' | 'card'>('view');

  if (localView === null) {
    setLocalStorage('table', 'view');
    dispatch(setView('table'));
  } else {
    dispatch(setView(localView));
  };
};

// запись в store и localStorage
export const changeView = (view: 'table' | 'card') => async (dispatch: Dispatch) => {
  setLocalStorage(view, 'view');
  dispatch(setView(view));
};