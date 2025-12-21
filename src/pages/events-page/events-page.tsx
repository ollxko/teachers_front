import { type JSX, useState } from 'react';
import './events-page.css';
import { Input } from 'antd';
import EventCard from '../../components/EventCard/EventCard';
import CalendarSelect from '../../components/CalendarSelect/CalendarSelect';

const { Search } = Input;

export default function Events(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [searchText, setSearchText] = useState('');

  const cardsData = [
    {
      id: 1,
      title:
        'Приглашаем вас на открытые уроки народной артистки РФ Марины Мещеряковой с 17-22 ноября в зал Российского фонда культуры.С 17 — 22 ноября народная артистка РФ, оперная певица с мировым именем, проведёт открытые уроки для молодых профессиональных музыкантов, успешно прошедших отбор для участия.',
      time: '14:00',
      address: 'МАОУ СОШ 100',
      image: 'https://img-fotki.yandex.ru/get/55231/129367479.254/0_13ed59_bd9ed3d8_X4L.jpg',
    },
    {
      id: 2,
      title: 'Cобытие 1',
      time: '14:00',
      address: 'МАОУ СОШ 100',
      image: 'https://img-fotki.yandex.ru/get/55231/129367479.254/0_13ed59_bd9ed3d8_X4L.jpg',
    },
  ];

  return (
    <div className='events-page'>
      <div className='events-page-container'>
        <div className='events-title'>События Екатеринбуржского Дома Учителя</div>
        <div className='calendar-search'>
          <CalendarSelect
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder='Выберите дату'
            width={300}
          />

          <Search
            placeholder='Введите текст для поиска'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            allowClear
            size='middle'
            style={{ width: 300 }}
          />
        </div>
        <div className='event-cards-container'>
          {cardsData.map(({ id, title, time, address, image }) => (
            <EventCard key={id} image={image} title={title} tag={'Онлайн'} />
          ))}
        </div>
      </div>
    </div>
  );
}
