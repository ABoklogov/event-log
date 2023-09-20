import { useAppSelector } from 'store/hooks';
import TableList from 'components/TableList';
import CardList from 'components/CardList';

function Main() {
  const { view, events } = useAppSelector((state) => state);

  return (
    view.value === 'table' ? (
      <TableList events={events.items} />
    ) : (
      <CardList events={events.items} />
    )
  );
};

export default Main;