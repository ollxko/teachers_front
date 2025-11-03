import type { JSX } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import './profile-page.css';
import { Menu, Classes, MenuItem, MenuDivider } from '@blueprintjs/core';
import InfoTable from '../../components/InfoTable/InfoTable';

type ProfileProps = {
  name: string;
};

export default function Profile({ name }: ProfileProps): JSX.Element {
  const handleMenuItemClick = (menuItem: string) => {
    console.log(`Выбран пункт: ${menuItem}`);
  };
  const sampleData = [
    { title: 'Имя', data: 'Александр Иванов' },
    { title: 'Email', data: 'alex@example.com' },
    { title: 'Телефон', data: '+7 (999) 123-45-67' },
    { title: 'Город', data: 'Москва' },
  ];

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        <div className='image-name-container'>
          <div className='profile-image-placeholder'></div>
          <div className='name'>{name}</div>
        </div>
        <div className='menu-info-container'>
          <div className='profile-menu'>
            <Menu className={`${Classes.ELEVATION_1} custom-profile-menu`}>
              <MenuItem
                className='custom-menu-item'
                icon='user'
                text='Основная информация'
                onClick={() => handleMenuItemClick('Основная информация')}
              />
              <MenuDivider />
              <MenuItem
                className='custom-menu-item'
                icon='briefcase'
                text='Профессиональная деятельность'
                onClick={() => handleMenuItemClick('Профессиональная деятельность')}
              />
              <MenuDivider />
              <MenuItem
                className='custom-menu-item'
                icon='trophy'
                text='Достижения'
                onClick={() => handleMenuItemClick('Достижения')}
              />
              <MenuDivider />
              <MenuItem
                className='custom-menu-item'
                icon='folder-open'
                text='Документы'
                onClick={() => handleMenuItemClick('Документы')}
              />
            </Menu>
            <div className='edit-button'>
              <div>Редактировать данные</div>
            </div>
          </div>
          <div className='info'>
            <div className='info-content'>
              <InfoTable items={sampleData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
