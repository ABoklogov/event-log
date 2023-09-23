import Event from 'interfaces/Events.interface';

const events: Event[] = [
  {
    id: '1',
    date: '23.09.2023, 10:26:55',
    importance: 'Высокая',
    equipment: 'Вегас',
    message: 'Сервер Vegas недоступен',
    responsible: 'Смирнов В.А.',
    read: false
  },
  {
    id: '2',
    date: '23.09.2023, 20:26:55',
    importance: 'Высокая',
    equipment: 'Коммутатор',
    message: 'Потеряно сетевое соединение',
    responsible: 'Капустин А.А.',
    read: false
  },
  {
    id: '3',
    date: '21.09.2023, 20:26:55',
    importance: 'Низкая',
    equipment: 'Люк',
    message: 'Открыта крышка',
    responsible: 'Ветрова И.С.',
    read: false
  },
  {
    id: '4',
    date: '23.04.2023, 20:26:55',
    importance: 'Высокая',
    equipment: 'ИБП',
    message: 'Низкий заряд батареи',
    responsible: 'Лавочкин А.В.',
    read: false
  },
  {
    id: '5',
    date: '23.09.2023, 20:26:00',
    importance: 'Критическая',
    equipment: 'Трансформатор',
    message: 'Недостаточное количество масла',
    responsible: 'Олышанская Е.Г.',
    read: true
  },
  {
    id: '6',
    date: '23.03.2023, 20:26:55',
    importance: 'Критическая',
    equipment: 'ЛВС',
    message: 'Обрыв силового кабеля',
    responsible: 'Смирнов В.А.',
    read: false
  },
  {
    id: '7',
    date: '23.09.2023, 11:26:55',
    importance: 'Высокая',
    equipment: 'Вегас',
    message: 'Отсутствует подтверждение пуска в работу',
    responsible: 'Смирнов В.А.',
    read: false
  }
];

type GetEvents = () => Promise<Event[]>;

const getEvents: GetEvents = function () {
  return new Promise((resolve) => {
    setTimeout(() => resolve(events), 250)
  })
};

export { getEvents };