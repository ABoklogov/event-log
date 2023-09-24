import { useState, useRef } from 'react';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteChangeEvent } from 'primereact/autocomplete';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useWidth } from 'hooks/useWidth';
import { searchEvents } from 'helpers/searchEvents';
import { setQuerySearch, removeSearch } from 'store/events/eventsSlice';
import s from './FormSearch.module.css';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

type OnChangeSearch = (e: AutoCompleteChangeEvent) => void;

function FormSearch() {
  const { events } = useAppSelector((state) => state);
  const [value, setValue] = useState('');
  const [items, setItems] = useState<string[]>([]); // массив найденных строк
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);
  const width = useWidth();

  const search = (event: AutoCompleteCompleteEvent) => {
    const searchArray = searchEvents(event.query, events.items);
    setItems([...searchArray].map(el => el.message));
  };

  const dispatchSearchEvents = () => {
    if (value) {
      dispatch(setQuerySearch(value));
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
    dispatch(removeSearch());
    setValue('');
  };

  const onChangeSearch: OnChangeSearch = (e) => {
    if (e.originalEvent) {
      if (e.originalEvent.type === 'change') {
        setValue(e.value);
      } else {
        setValue(e.value);
        const searchArray = searchEvents(e.value, events.items);
        setItems([...searchArray].map(el => el.message));
      };
    };
  };

  return (
    <div
      className={s.formSearch}
      style={width < 992 ? { width: '100%', marginTop: '20px' } : undefined}
    >
      <div className="p-inputgroup">
        <AutoComplete
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={onChangeSearch}
          style={width >= 992 ? { width: '400px' } : undefined}
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
};

export default FormSearch;