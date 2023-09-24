import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from 'store/hooks';
import { readEvents } from 'store/events/eventsOperations';
import { DataTable, DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import s from './TableList.module.css';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { useKeyPress } from 'hooks/useKeyPress';
import Event from 'interfaces/Events.interface';
import { Toast } from 'primereact/toast';

interface Props {
  events: Event[];
};
type OnSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Event[]>) => void;

function TableList({ events }: Props) {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const dispatch = useAppDispatch();
  const isSpacePressed = useKeyPress(' ');
  const toast = useRef<Toast>(null);

  // при нажитии клавиши 'space' отмечаем сообщения на прочтение
  useEffect(() => {
    if (isSpacePressed) {
      dispatch(readEvents(selectedEvents))
      showToast();
    };
  }, [isSpacePressed]);

  const showToast = () => {
    if (!toast.current) throw Error("toast is not assigned");
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Выделенные сообщения прочитаны' });
  };

  const readIcon = (rowData: Event) => {
    return !rowData.read ? <Badge></Badge> : <></>
  };

  const onSelectionChange: OnSelectionChange = (e) => {
    if (e.originalEvent.type !== 'keydown') {
      setSelectedEvents(e.value);
    };
  };

  return (
    <>
      <Toast ref={toast} />
      <DataTable
        value={events}
        size='small'
        dataKey="id"
        removableSort
        tableStyle={{ minWidth: '50rem' }}
        selectionMode="multiple"
        selection={selectedEvents}
        onSelectionChange={onSelectionChange}
        dragSelection
        paginator
        rows={6}
        rowsPerPageOptions={[6, 12, 24]}
        className={s.tableList}
      >
        <Column field="date" header="Дата" sortable style={{ width: '20%' }}></Column>
        <Column field="importance" header="Важность" sortable style={{ width: '10%' }}></Column>
        <Column field="equipment" header="Оборудование" sortable style={{ width: '10%' }}></Column>
        <Column field="message" header="Сообщение" sortable style={{ width: '50%' }}></Column>
        <Column field="responsible" header="Ответственный" sortable style={{ width: '15%' }}></Column>
        <Column field="read" header="Прочитано" dataType="boolean" sortable style={{ width: '5%' }} bodyStyle={{ textAlign: 'center' }} body={readIcon}></Column>
      </DataTable>
    </>
  );
};

export default TableList;