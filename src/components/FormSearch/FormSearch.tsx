import { AutoComplete } from 'primereact/autocomplete';
import { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import Event from 'interfaces/Events.interface';
import s from './FormSearch.module.css';
import { Button } from 'primereact/button';

function FormSearch() {
  const events = useAppSelector((state) => state.events.items);
  const [value, setValue] = useState('');
  const [searchEvents, setSearchEvents] = useState<Event[]>([]); //найденные объекты задач
  const [items, setItems] = useState<string[]>([]); // массив найденных строк

  const search = (event: any) => {
    const searchArray = events.filter(({ message }) => message.toLowerCase().includes(event.query.toLowerCase()))

    setSearchEvents([...searchArray]);
    setItems([...searchArray].map(el => el.message));
  };

  return (
    <div className={s.formSearch}>
      <AutoComplete
        className={s.inputSearch}
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(e) => setValue(e.value)}
      />

      <div className={s.btnSearch}>
        <Button label="Поиск" />
      </div>
    </div>
  );
}

export default FormSearch;