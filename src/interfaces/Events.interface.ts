export default interface Event {
  id: string;
  date: string;
  importance: 'Высокая' | 'Критическая' | 'Низкая';
  equipment: string;
  message: string;
  responsible: string;
  read: boolean
}