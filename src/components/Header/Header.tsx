import s from './Header.module.css';
import ViewBtn from 'components/ViewBtn';
import FormSearch from 'components/FormSearch';

function Header() {
  return (
    <div className={s.header}>
      <ViewBtn />
      <FormSearch />
    </div>
  );
}

export default Header;