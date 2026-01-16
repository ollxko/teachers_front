import type { JSX } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import UserMenuDropdown from '../DropDownMenu/DropDownMenu';
export default function Header(): JSX.Element {
  console.log('Header component rendered');
  return (
    <div className='headerContainer'>
      <Link to={'/news'} className='news'>
        <div className='logo'>Дом учителя</div>
      </Link>
      <div className='menu'>
        <Link to={'/news'} className='news'>
          Новости
        </Link>
        <Link to={'/courses'} className='courses'>
          Курсы
        </Link>
        <Link to={'/events'} className='events'>
          События
        </Link>
      </div>
      <div className='profile'>{<UserMenuDropdown />}</div>
    </div>
  );
}
