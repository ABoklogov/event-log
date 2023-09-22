import { Suspense, useEffect, useRef } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchEvents } from 'store/events/eventsOperations';
import Header from 'components/Header';
import Container from 'components/Container';
import Main from 'components/Main';
import { Toast } from 'primereact/toast';
import s from './App.module.css';

function App() {
  const { events } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  useEffect(() => {
    if (events.error) showToast(events.error);
  }, [events.error]);

  const showToast = (message: string) => {
    if (!toast.current) throw Error("toast is not assigned");
    toast.current.show({
      severity: 'error', summary: 'Error', detail: message, life: 3000
    });
  };

  return (
    <Container>
      <Header />
      <Suspense fallback={<ProgressSpinner />}>
        <div className={s.mainContainer}>
          <Main />
        </div>
      </Suspense>

      <Toast ref={toast} />
    </Container>
  );
}

export default App;
