import type { JSX } from 'react';
import { InfoTableWithIcon } from '../../../components/InfoTable/InfoTable';
import './main-admin-page.css';

export default function MainAdmin(): JSX.Element {
  return (
    <div className='main-admin-page'>
      <div className='main-admin-page-container'>
        <div className='create-post-button'>
          <div className='create-post-button-title'>Создать новость, событие или курс</div>
        </div>
        <div className='manage-posts-title'>Управлять постами</div>
        <InfoTableWithIcon
          className='posts-table'
          titles={['Новость', 'Событие', 'Курс']}
          icon={<></>}
        />
      </div>
    </div>
  );
}
