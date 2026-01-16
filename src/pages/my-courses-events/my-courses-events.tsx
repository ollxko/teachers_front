// components/UserEventsList.tsx
import React, { type JSX } from 'react';
import { useUserEvents } from '../../hooks/Events/useUserEvents';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './my-courses-events.css';
import EventCard from '../../components/EventCard/EventCard';
import { formatDate } from '../../utils/dateFormatter';
import { formatTime } from '../../utils/timeFormatter';

export default function UserEventsList(): JSX.Element {
  const { events, isLoading, error, refresh, cancelRegistration } = useUserEvents();

  if (isLoading) {
    return (
      <div className='user-events'>
        <div className='user-events-container'>
          <div className='loading-state'>
            <p>Загрузка ваших событий...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='user-events'>
        <div className='user-events-container'>
          <div className='error-state'>
            <p>{error}</p>
            <button onClick={refresh} className='refresh-button'>
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className='user-events'>
        <div className='user-events-container'>
          <div className='empty-events-state'>
            <p>Вы еще не зарегистрированы ни на одно событие</p>
            <Link to='/events'>
              <button className='explore-events-btn'>Посмотреть все события</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function handleCancelRegistration(registrationId: string, eventName: string) {
    return async () => {
      if (window.confirm(`Вы уверены, что хотите отменить регистрацию на "${eventName}"?`)) {
        const success = await cancelRegistration(registrationId);
        if (success) {
          alert('Регистрация отменена');
        } else {
          alert('Не удалось отменить регистрацию');
        }
      }
    };
  }

  return (
    <div className='user-events'>
      <div className='user-events-container'>
        <div className='user-events-header'>
          <h2 className='user-events-title'>Мои события</h2>
        </div>

        <div className='user-events-grid'>
          <div className='event-cards-container'>
            {events.map(({ event, registration }) => (
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
    </div>
  );
}
