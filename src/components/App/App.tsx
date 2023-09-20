import { Suspense } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Provider } from 'react-redux';
import { store } from 'store/index';
import Header from 'components/Header';
import Container from 'components/Container';
import Main from 'components/Main';
import s from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <Suspense fallback={<ProgressSpinner />}>
          <div className={s.mainContainer}>
            <Main />
          </div>
        </Suspense>
      </Container>
    </Provider>
  );
}

export default App;
