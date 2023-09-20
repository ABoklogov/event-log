import { Button } from 'primereact/button';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setView } from 'store/view/viewSlice';

const styleNotActive = {
  backgroundColor: 'var(--highlight-bg)',
  color: 'var(--highlight-text-color)'
};

function ViewBtn() {
  const view = useAppSelector((state) => state.view.value);
  const dispatch = useAppDispatch();

  return (
    <span className="p-buttonset">
      <Button
        label="Таблица"
        icon="pi pi-list"
        style={view === 'table' ? undefined : styleNotActive}
        onClick={() => dispatch(setView('table'))}
      />
      <Button
        label="Карточки"
        icon="pi pi-th-large"
        style={view === 'card' ? undefined : styleNotActive}
        onClick={() => dispatch(setView('card'))}
      />
    </span>
  );
}

export default ViewBtn;