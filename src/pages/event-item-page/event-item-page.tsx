import { useMemo, type JSX } from 'react';
import './event-item-page.css';
import { Link, useParams } from 'react-router-dom';
import { Tag, Typography } from 'antd';
import Linkify from 'react-linkify';
import Button from '../../components/Button/Button';
import { CalendarOutlined, FieldTimeOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useEventItem } from '../../hooks/useEventsItem';
import { formatDate } from '../../utils/dateFormatter';
import { formatTime } from '../../utils/timeFormatter';

const { Title, Text } = Typography;

type DateFormatterProps = {
  dateString: string;
};

function DateFormatter({ dateString }: DateFormatterProps) {
  const formattedDate = useMemo(() => {
    const date = new Date(dateString.split('.').reverse().join('-'));

    const formatted = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }).format(date);

    const parts = formatted.split(', ');
    if (parts.length === 2) {
      return `${parts[1]}, ${parts[0]}`;
    }

    return formatted;
  }, [dateString]);

  return formattedDate;
}

export default function EventItem(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { eventsItem, loading, error } = useEventItem(id);

  // Используем данные из API, если они есть, иначе показываем заглушку
  const displayData = eventsItem || {
    name: 'Загрузка...',
    description: 'Загрузка описания...',
    date: new Date().toISOString(),
    address: 'Адрес не указан',
    imageUrl: '',
    isOnline: false,
    type: 'Мероприятие',
  };

  return (
    <div className='event-item-container'>
      <Link to='/events' className='back-link'>
        ← Назад к списку событий
      </Link>

      <div className='event-layout'>
        <article className='event-item'>
          <Title>{displayData.name}</Title>

          <Tag color={'cyan'}>Мероприятие</Tag>

          <div className='event-item-datetime'>
            <div className='datetime-item'>
              <CalendarOutlined />
              <Text type='secondary'>
                Дата: <DateFormatter dateString={formatDate(displayData.date)} />
              </Text>
            </div>
            <div className='datetime-item'>
              <FieldTimeOutlined />
              <Text type='secondary'>Время: {formatTime(displayData.date)}</Text>
            </div>
            <div className='datetime-item'>
              <EnvironmentOutlined />
              <Text type='secondary'>Адрес: {displayData.address}</Text>
            </div>
          </div>

          <div className='event-item-content'>
            <Linkify>
              <Text>{displayData.description}</Text>
            </Linkify>
          </div>
        </article>

        <div className='event-sidebar'>
          {displayData.imageUrl && (
            <div className='event-image-container'>
              <img src={displayData.imageUrl} alt={displayData.name} className='event-item-image' />
            </div>
          )}

          <Button text='Записаться' />
        </div>
      </div>
    </div>
  );
}
