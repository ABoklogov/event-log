import { useState, useRef } from 'react';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteChangeEvent } from 'primereact/autocomplete';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { changeSearchEvents, fetchEvents } from 'store/events/eventsOperations';
import Event from 'interfaces/Events.interface';
import s from './FormSearch.module.css';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

type FilterEvents = (query: string, items: Event[]) => Event[];
type OnChangeSearch = (e: AutoCompleteChangeEvent) => void;

function FormSearch() {
  const { events } = useAppSelector((state) => state);
  const [value, setValue] = useState('');
  const [searchEvents, setSearchEvents] = useState<Event[]>([]); //найденные объекты задач
  const [items, setItems] = useState<string[]>([]); // массив найденных строк
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);

  console.log("🚀 ~ FormSearch ~ searchEvents:", searchEvents)
  console.log("🚀 ~ FormSearch ~ value:", value)

  const search = (event: AutoCompleteCompleteEvent) => {
    // const searchArray = events.items.filter(({ message }) => message.toLowerCase().includes(event.query.toLowerCase()));
    const searchArray = filterEvents(event.query, events.itemsSearch);

    setSearchEvents([...searchArray]);
    setItems([...searchArray].map(el => el.message));
  };

  const filterEvents: FilterEvents = (query, items) => {
    return items.filter(({ message }) => message.toLowerCase().includes(query.toLowerCase()));
  };

  const dispatchSearchEvents = () => {
    if (value) {
      dispatch(changeSearchEvents(searchEvents))
    } else {
      showToast();
    };
  };

  const showToast = () => {
    if (!toast.current) throw Error("toast is not assigned");
    toast.current.show({
      severity: 'warn', summary: 'Warning', detail: 'Условия поиска не заданы', life: 2000
    });
  };

  const clearInputSearch = () => {
    dispatch(fetchEvents());
    setValue('');
  };

  const onChangeSearch: OnChangeSearch = (e) => {
    if (e.originalEvent) {
      if (e.originalEvent.type === 'change') {
        setValue(e.value);
      } else {
        setValue(e.value);
        const searchArray = filterEvents(e.value, events.itemsSearch);
        setSearchEvents([...searchArray]);
        setItems([...searchArray].map(el => el.message));
      }
    }
    console.log(e);
  };

  return (
    <div className={s.formSearch}>
      <div className="p-inputgroup">
        <AutoComplete
          className={s.inputSearch}
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={onChangeSearch}
        />

        {events.search ? (
          <Button icon='pi pi-times' onClick={clearInputSearch} />
        ) : (
          <span className="p-inputgroup-addon">
            <i className="pi pi-search"></i>
          </span>
        )}
      </div>

      <div className={s.btnSearch}>
        <Button label="Поиск" onClick={dispatchSearchEvents} />
      </div>

      <Toast ref={toast} />
    </div>
  );
}

export default FormSearch;