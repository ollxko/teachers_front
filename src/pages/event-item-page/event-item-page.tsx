import type { JSX } from 'react';
import './event-item-page.css';
import { Link } from 'react-router-dom';
import { Tag, Typography } from 'antd';
import Linkify from 'react-linkify';
import { useMemo } from 'react';
import EnrollButton from '../../components/EnrollButton/EnrollButton';

import { CalendarOutlined, FieldTimeOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type EventItemProps = {
  title: string;
  content: string;
  date: string;
  time: string;
  address: string;
  image: string;
};

const EventData: EventItemProps = {
  title: 'Комфортная адаптация молодого специалиста',
  content:
    'Целевая аудитория: молодые специалисты\nСпикер: Мария Нечаева, старший методист ЕДУ\n\nПочему это будет полезно?\n\n+ Знакомство с моделями и этапами адаптации\n+ Осознание своего внутреннего состояния\n+ Анализ типичных проблем адаптации\n+ Овладение механизмами и инструментами облегчения адаптации',
  date: '19.9.2025',
  time: '14:00-15:00',
  address: 'МАОУ СОШ 100',
  image: '/5472179671505434589.jpg',
};

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
  return (
    <div className='event-item-container'>
      <Link to='/events' className='back-link'>
        ← Назад к списку событий
      </Link>

      <div className='event-layout'>
        <article className='event-item'>
          <Title>{EventData.title}</Title>

          <Tag color={'purple'}>{'Онлайн'}</Tag>
          <Tag color={'cyan'}>{'Вебинар'}</Tag>

          <div className='event-item-datetime'>
            <div className='datetime-item'>
              <CalendarOutlined />
              <Text type='secondary'>
                Дата: <DateFormatter dateString={EventData.date} />
              </Text>
            </div>
            <div className='datetime-item'>
              <FieldTimeOutlined />
              <Text type='secondary'>Время: {EventData.time}</Text>
            </div>
            <div className='datetime-item'>
              <EnvironmentOutlined />
              <Text type='secondary'>Адрес: {EventData.address}</Text>
            </div>
          </div>

          <div className='event-item-content'>
            <Linkify>
              <Text>{EventData.content}</Text>
            </Linkify>
          </div>
        </article>

        <div className='event-sidebar'>
          {EventData.image && (
            <div className='event-image-container'>
              <img src={EventData.image} alt={EventData.title} className='event-item-image' />
            </div>
          )}

          <EnrollButton />
        </div>
      </div>
    </div>
  );
}
