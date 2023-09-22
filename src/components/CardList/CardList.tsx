import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from 'store/hooks';
import { readEvents } from 'store/events/eventsOperations';
import Event from 'interfaces/Events.interface';
import s from './CardList.module.css';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Badge } from 'primereact/badge';
import CardContent from 'components/CardContent';
import { useKeyPress } from 'hooks/useKeyPress';
import { Toast } from 'primereact/toast';

interface Props {
  events: Event[];
};

function CardList({ events }: Props) {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const isCmdPressed = useKeyPress('Meta');
  const isControlPressed = useKeyPress('Control');
  const isSpacePressed = useKeyPress(' ');
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);
  console.log("🚀 ~ CardList ~ selectedEvents:", selectedEvents)

  // при нажитии клавиши 'space' отмечаем сообщения на прочтение
  useEffect(() => {
    if (isSpacePressed) {
      dispatch(readEvents(selectedEvents));
      showToast();
    };
  }, [isSpacePressed]);

  const showToast = () => {
    if (!toast.current) throw Error("toast is not assigned");
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Выделенные сообщения прочитаны' });
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const onSelectionChange = (event: Event) => {
    setSelectedEvents([event]);
    if (isCmdPressed || isControlPressed) onSelectionChangePressedCmd(event);
  };

  const onSelectionChangePressedCmd = (event: Event) => {
    const searchEvent = selectedEvents.find(el => el.id === event.id);
    if (!searchEvent) setSelectedEvents([...selectedEvents, event]);
  };

  const readIcon = (read: boolean) => {
    return !read ? <Badge style={{ position: 'absolute', top: 10, right: 10 }}></Badge> : <></>
  };

  return (
    <>
      <Toast ref={toast} />

      <ul className={s.cardList}>
        {events.slice(first, first + rows).map((event) => (
          <li
            key={event.id}
            className={s.cardItem}
            onClick={() => onSelectionChange(event)}
          >
            {readIcon(event.read)}
            <CardContent
              id={event.id}
              date={event.date}
              importance={event.importance}
              equipment={event.equipment}
              message={event.message}
              responsible={event.responsible}
              selectedEvents={selectedEvents}
            />
          </li>
        ))}
      </ul>

      <Paginator
        first={first}
        rows={rows}
        totalRecords={events.length}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default CardList;