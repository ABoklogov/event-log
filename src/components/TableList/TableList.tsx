import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Event from 'interfaces/Events.interface';

interface Props {
  events: Event[];
};

function TableList({ events }: Props) {

  return (
    <DataTable value={events} removableSort tableStyle={{ minWidth: '50rem' }}>
      <Column field="date" header="Дата" sortable style={{ width: '25%' }}></Column>
      <Column field="importance" header="Важность" sortable style={{ width: '10%' }}></Column>
      <Column field="equipment" header="Оборудование" sortable style={{ width: '10%' }}></Column>
      <Column field="message" header="Сообщение" sortable style={{ width: '50%' }}></Column>
      <Column field="responsible" header="Ответственный" sortable style={{ width: '15%' }}></Column>
    </DataTable>
  );
};

export default TableList;