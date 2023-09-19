const events = [
  {
    id: 1,
    date: '2023-08-27T00:00:00',
    importance: 'Высокая',
    equipment: 'Вегас',
    message: 'Сервер Vegas недоступен',
    responsible: 'Смирнов В.А.',
    read: false
  },
  {
    id: 2,
    date: '2023-08-28T00:00:00',
    importance: 'Высокая',
    equipment: 'Коммутатор',
    message: 'Потеряно Сетевое соединение',
    responsible: 'Капустин А.А.',
    read: false
  },
  {
    id: 3,
    date: '2023-08-29T00:00:00',
    importance: 'Низкая',
    equipment: 'Люк',
    message: 'Открыта крышка',
    responsible: 'Ветрова И.С.',
    read: false
  },
  {
    id: 4,
    date: '2023-08-23T00:00:00',
    importance: 'Высокая',
    equipment: 'ИБП',
    message: 'Низкий заряд батареи',
    responsible: 'Лавочкин А.В.',
    read: false
  },
  {
    id: 5,
    date: '2023-08-22T00:00:00',
    importance: 'Критическая',
    equipment: 'Трансформатор',
    message: 'Недостаточное количество масла',
    responsible: 'Олышанская Е.Г.',
    read: false
  },
  {
    id: 6,
    date: '2023-08-24T00:00:00',
    importance: 'Критическая',
    equipment: 'ЛВС',
    message: 'Обрыв силового кабеля',
    responsible: 'Смирнов В.А.',
    read: false
  },
  {
    id: 7,
    date: '2023-08-12T00:00:00',
    importance: 'Высокая',
    equipment: 'Вегас',
    message: 'Отсутствует подтверждение пуска в работу',
    responsible: 'Смирнов В.А.',
    read: false
  }
];

function getEvents() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(events), 250)
  })
};

export { getEvents }