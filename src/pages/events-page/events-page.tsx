import { type JSX, useState } from 'react';
import './events-page.css';
import { Calendar, Input, Select, Divider } from 'antd';
import type { Dayjs } from 'dayjs';
import EventCard from '../../components/EventCard/EventCard';

const { Search } = Input;
const { Option } = Select;

export default function Events(): JSX.Element {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

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

  const handleDateSelect = (value: Dayjs) => {
    setSelectedDate(value.format('DD.MM.YYYY'));
    setIsCalendarOpen(false);
  };

  const calendarContent = (
    <div style={{ padding: '8px 0' }}>
      <div style={{ padding: '0 12px 8px 12px' }}>
        <Calendar fullscreen={false} onSelect={handleDateSelect} />
      </div>
      <Divider style={{ margin: '8px 0' }} />
      <div style={{ padding: '0 12px' }}>
        <a
          onClick={() => setIsCalendarOpen(false)}
          style={{ display: 'block', textAlign: 'center' }}
        >
          Закрыть
        </a>
      </div>
    </div>
  );

  return (
    <div className='events-page'>
      <div className='events-page-container'>
        <div className='events-title'>События Екатеринбуржского Дома Учителя</div>
        <div className='calendar-search'>
          <Select
            placeholder='Выберите дату'
            value={selectedDate || undefined}
            open={isCalendarOpen}
            onOpenChange={open => setIsCalendarOpen(open)}
            popupRender={() => calendarContent}
            size='large'
            style={{ width: 300 }}
          >
            <Option key='calendar' value='calendar' style={{ display: 'none' }}>
              {selectedDate}
            </Option>
          </Select>

          <Search
            placeholder='Введите текст для поиска'
            allowClear
            size='large'
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
