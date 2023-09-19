import { Suspense } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import Header from 'components/Header';

function App() {
  return (
    <Suspense fallback={<ProgressSpinner />}>
      <Header />
    </Suspense>
  );
}

export default App;
