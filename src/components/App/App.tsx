import { Suspense } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Provider } from 'react-redux';
import { store } from 'store/index';
import Header from 'components/Header';
import Container from 'components/Container';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Suspense fallback={<ProgressSpinner />}>
          <Header />
        </Suspense>
      </Container>
    </Provider>
  );
}

export default App;
