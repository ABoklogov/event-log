import { Suspense, useEffect, useRef } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchEvents } from 'store/events/eventsOperations';
import { calcTheView } from 'store/view/viewOperations';
import { toggleSidbar } from 'store/view/viewSlice';
import Header from 'components/Header';
import Container from 'components/Container';
import Main from 'components/Main';
import AddEventForm from 'components/AddEventForm';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import s from './App.module.css';

function App() {
  const { events, view } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(calcTheView());
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

      <Sidebar
        visible={view.sidebar}
        onHide={() => dispatch(toggleSidbar(false))}
        className="w-full md:w-20rem lg:w-30rem"
        position="right"
      >
        <AddEventForm />
      </Sidebar>
      <Button
        icon="pi pi-plus"
        rounded
        style={{ position: 'fixed', right: '50px', bottom: '50px' }}
        onClick={() => dispatch(toggleSidbar(true))}
      />
      <Toast ref={toast} />
    </Container>
  );
}

export default App;
