import { Suspense } from 'react';
import Spiner from 'components/Spiner';

function App() {
  return (
    <Suspense fallback={<Spiner />}>
      133
    </Suspense>
  );
}

export default App;
