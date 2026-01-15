import { type JSX, useState, useMemo } from 'react';
import './events-page.css';
import { Input } from 'antd';
import EventCard from '../../components/EventCard/EventCard';
import CalendarSelect from '../../components/CalendarSelect/CalendarSelect';
import { useEvents } from '../../hooks/Events/useEvents';
import { formatDate } from '../../utils/dateFormatter';
import { formatTime } from '../../utils/timeFormatter';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { selectCurrentUser, hasAnyRole } from '../../store/slices/authSlice';
import { useSelector } from 'react-redux';

const { Search } = Input;

const formatDateToYYYYMMDD = (dateString: string): string => {
  const [day, month, year] = dateString.split('.');
  return `${year}-${month}-${day}`;
};

export default function Events(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [searchText, setSearchText] = useState('');

  const params = useMemo(
    () => ({
      take: 100, // Загружаем достаточно событий для фильтрации
    }),
    []
  );

  const { events, loading, error } = useEvents(params);
  const user = useSelector(selectCurrentUser);
  const isAdmin = hasAnyRole(user, ['admin', 'superadmin']);

  // Фильтрация событий по выбранной дате
  const filteredEvents = useMemo(() => {
    // Если дата не выбрана - показываем все события
    if (!selectedDate) {
      return [...events].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return events
      .filter(event => event.date.slice(0, 10) === formatDateToYYYYMMDD(selectedDate))
      .sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, [events, selectedDate]);

  return (
    <div className='events-page'>
      <div className='events-page-container'>
        {isAdmin && (
          <div className='buttonCreatePost'>
            <Link to='/create-event'>
              <Button text={'Создать событие'}></Button>
            </Link>
          </div>
        )}
        <div className='events-title'>События Екатеринбургского Дома Учителя</div>
        
        <div className='calendar-search'>
          <CalendarSelect
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder='Выберите дату для фильтрации'
            width={300}
          />

          <Search
            placeholder='Поиск по названию (опционально)'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            allowClear
            size='middle'
            style={{ width: 300 }}
          />
        </div>

        {selectedDate && (
          <div className='filter-info'>
            <div>
              Показаны события на дату: <strong>{selectedDate}</strong>
              <span style={{ marginLeft: '20px' }}>
                Найдено: {filteredEvents.length}
              </span>
            </div>
            <button 
              onClick={() => setSelectedDate('')}
              className='clear-filter-btn'
            >
              Показать все события
            </button>
          </div>
        )}

        <div className='event-cards-container'>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <EventCard
                  image={event.imageUrl}
                  title={event.name}
                  tag={event.type}
                  date={formatDate(event.date)}
                  time={formatTime(event.date)}
                  address={event.address}
                />
              </Link>
            ))
          ) : (
            <div className='no-events-message'>
              {loading ? (
                'Загрузка событий...'
              ) : selectedDate ? (
                `На ${selectedDate} событий не найдено`
              ) : (
                'Событий пока нет'
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
