import { useState } from 'react';
import { Card } from 'primereact/card';
import Event from 'interfaces/Events.interface';
import s from './CardList.module.css';
import { Paginator } from 'primereact/paginator';

interface Props {
  events: Event[];
};

function CardList({ events }: Props) {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  console.log("🚀 ~ CardList ~ first:", first)
  console.log("🚀 ~ CardList ~ rows:", rows)

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <>
      <ul className={s.cardList}>
        {events.slice(first, first + rows).map(({ id, date, importance, equipment, message, responsible, read }) => (
          <li key={id} className={s.cardItem}>
            <Card>
              <div>{date}</div>
              <div>{importance}</div>
              <div>{equipment}</div>
              <div>{message}</div>
              <div>{responsible}</div>
            </Card>
          </li>
        ))}
      </ul>

      <Paginator
        first={first}
        rows={rows}
        totalRecords={events.length}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default CardList;