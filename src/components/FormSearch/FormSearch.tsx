import { AutoComplete } from 'primereact/autocomplete';
import { useState } from 'react';
import s from './FormSearch.module.css';
import { Button } from 'primereact/button';

function FormSearch() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const search = (event: any) => {
    // setItems([...Array(10).keys()].map(item => event.query + '-' + item));
  }

  return (
    <div>
      <AutoComplete
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(e) => setValue(e.value)}
      />

      <Button className={s.btnSearch} label="Поиск" />
    </div>
  );
}

export default FormSearch;