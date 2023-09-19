import { useEffect } from 'react';
import s from './Header.module.css';
import ViewBtn from 'components/ViewBtn';
import FormSearch from 'components/FormSearch';
import { useAppDispatch } from 'store/hooks';
import { fetchEvents } from 'store/events/eventsOperations';

function Header() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents())
  })

  return (
    <div className={s.header}>
      <ViewBtn />
      <FormSearch />
    </div>
  );
}

export default Header;