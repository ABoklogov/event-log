import { Card } from 'primereact/card';
import Event from 'interfaces/Events.interface';
import s from './CardList.module.css';

interface Props {
  events: Event[];
};

function CardList({ events }: Props) {
  return (
    <ul className={s.cardList}>
      {events.map(({ date, importance, equipment, message, responsible, read }) => (
        <li className={s.cardItem}>
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
  );
}

export default CardList;