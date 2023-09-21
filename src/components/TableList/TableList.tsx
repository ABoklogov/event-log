import { useState, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { readEvents } from 'store/events/eventsOperations';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { useKeyPress } from 'hooks/useKeyPress';
import Event from 'interfaces/Events.interface';

interface Props {
  events: Event[];
};

function TableList({ events }: Props) {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const dispatch = useAppDispatch();
  // const isSpacePressed = useKeyPress('f');
  console.log("🚀 ~ TableList :", selectedEvents)

  // при нажитии клавиши 'space' отмечаем сообщения на прочтение
  // useEffect(() => {
  //   console.log("🚀 ~ useEffect :", selectedEvents)
  //   if (isSpacePressed) dispatch(readEvents(selectedEvents));
  // }, [isSpacePressed]);

  const readIcon = (rowData: Event) => {
    return !rowData.read ? <Badge></Badge> : <></>
  };

  return (
    <DataTable
      value={events}
      size={'small'}
      dataKey="id"
      removableSort
      tableStyle={{ minWidth: '50rem' }}
      selectionMode="multiple"
      selection={selectedEvents}
      onSelectionChange={(e) => setSelectedEvents(e.value)}
      dragSelection
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25]}
    >
      <Column field="date" header="Дата" sortable style={{ width: '20%' }}></Column>
      <Column field="importance" header="Важность" sortable style={{ width: '10%' }}></Column>
      <Column field="equipment" header="Оборудование" sortable style={{ width: '10%' }}></Column>
      <Column field="message" header="Сообщение" sortable style={{ width: '50%' }}></Column>
      <Column field="responsible" header="Ответственный" sortable style={{ width: '15%' }}></Column>
      <Column field="read" header="Прочитано" dataType="boolean" sortable style={{ width: '5%' }} bodyStyle={{ textAlign: 'center' }} body={readIcon}></Column>
    </DataTable>
  );
};

export default TableList;