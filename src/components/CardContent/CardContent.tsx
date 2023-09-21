import { Card } from 'primereact/card';
import s from './CardContent.module.css';
import { Avatar } from 'primereact/avatar';
import Event from 'interfaces/Events.interface';

interface Props {
  id: string,
  date: string;
  importance: string;
  equipment: string;
  message: string;
  responsible: string;
  selectedEvents: Event[];
};

const selectedStyles = {
  backgroundColor: 'var(--highlight-bg)'
};

function CardContent({
  id,
  date,
  importance,
  equipment,
  message,
  responsible,
  selectedEvents
}: Props) {
  return (
    <Card style={selectedEvents.find(el => el.id === id) ? selectedStyles : undefined}>
      <div className={s.content}>
        <div className={s.contentBody}>
          <div className={s.contentRight}>
            <div className={s.contentSubBox}>
              <div className={s.label}>Дата:</div>
              <div className={s.value}>{date}</div>
            </div>
            <div className={s.contentSubBox}>
              <div className={s.label}>Важность:</div>
              <div className={s.value}>{importance}</div>
            </div>
            <div className={s.contentSubBox}>
              <div className={s.label}>Оборудование:</div>
              <div className={s.value}>{equipment}</div>
            </div>
          </div>

          <div className={s.contentAvatar}>
            <Avatar
              style={{ marginBottom: '10px' }}
              icon="pi pi-user"
              size="xlarge"
              shape="circle"
            />
            <div className={s.value}>{responsible}</div>
          </div>
        </div>

        <div className={s.contentFooter}>
          <div className={s.label}>Сообщение:</div>
          <div className={s.value}>{message}</div>
        </div>
      </div>
    </Card>
  );
}

export default CardContent;