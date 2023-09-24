import { useAppSelector } from 'store/hooks';
import TableList from 'components/TableList';
import CardList from 'components/CardList';
import { searchEvents } from 'helpers/searchEvents';

function Main() {
  const { view, events } = useAppSelector((state) => state);

  // определяем какой массив карточек показывать 
  const totalEvents = !events.search ? events.items : searchEvents(events.querySearch, events.items);

  return (
    view.value === 'table' ? (
      <TableList events={totalEvents} />
    ) : (
      <CardList events={totalEvents} />
    )
  );
};

export default Main;