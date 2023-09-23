import Event from 'interfaces/Events.interface';
type UseSearch = (query: string, items: Event[]) => Event[];

export const searchEvents: UseSearch = (query, items) => {
  return items.filter(({ message }) => message.toLowerCase().includes(query.toLowerCase()));
};