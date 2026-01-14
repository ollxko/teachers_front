import { type JSX, useState } from 'react';
import './events-page.css';
import { Input } from 'antd';
import EventCard from '../../components/EventCard/EventCard';
import CalendarSelect from '../../components/CalendarSelect/CalendarSelect';
import { useMemo } from 'react';
import { useEvents } from '../../hooks/Events/useEvents';
import { formatDate } from '../../utils/dateFormatter';
import { formatTime } from '../../utils/timeFormatter';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { selectCurrentUser, hasAnyRole } from '../../store/slices/authSlice';
import { useSelector } from 'react-redux';

const { Search } = Input;

export default function Events(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [searchText, setSearchText] = useState('');

  const params = useMemo(
    () => ({
      take: 10,
    }),
    []
  );

  const { events, loading, error } = useEvents(params);
  const user = useSelector(selectCurrentUser);
  const isAdmin = hasAnyRole(user, ['admin', 'superadmin']);

  return (
    <div className='events-page'>
      <div className='events-page-container'>
        {isAdmin && (
          <div className='buttonCreatePost'>
            <Link to='/create-news'>
              <Button text={'Создать новость'}></Button>
            </Link>
          </div>
        )}
        <div className='events-title'>События Екатеринбургского Дома Учителя</div>
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
          {events.map(event => (
            <Link to={`/events/${event.id}`}>
              <EventCard
                key={event.id}
                image={event.imageUrl}
                title={event.name}
                tag={event.type}
                date={formatDate(event.date)}
                time={formatTime(event.date)}
                address={event.address}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
