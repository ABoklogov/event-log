import { Button } from 'primereact/button';
import { useState } from 'react';

const styleNotActive = {
  backgroundColor: 'var(--highlight-bg)',
  color: 'var(--highlight-text-color)'
};

function ViewBtn() {
  const [view, setView] = useState<'table' | 'card'>('table');

  return (
    <span className="p-buttonset">
      <Button
        label="Таблица"
        icon="pi pi-list"
        style={view === 'table' ? undefined : styleNotActive}
        onClick={() => setView('table')}
      />
      <Button
        label="Карточки"
        icon="pi pi-th-large"
        style={view === 'card' ? undefined : styleNotActive}
        onClick={() => setView('card')}
      />
    </span>
  );
}

export default ViewBtn;