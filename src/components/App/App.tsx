import { Suspense } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Provider } from 'react-redux';
import { store } from 'store/index';
import Header from 'components/Header';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<ProgressSpinner />}>
        <Header />
      </Suspense>
    </Provider>
  );
}

export default App;
