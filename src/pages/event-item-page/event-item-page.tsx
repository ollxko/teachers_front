import type { JSX } from 'react';
import './event-item-page.css'
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import { useMemo } from 'react';
import EnrollButton from '../../components/EnrollButton/EnrollButton';

type EventItemProps = {
  title: string;
  content: string;
  date: string;
  time: string;
};

const EventData: EventItemProps = {
  title: 'Комфортная адаптация молодого специалиста',
  content: 'Целевая аудитория: молодые специалисты\nСпикер: Мария Нечаева, старший методист ЕДУ\n\nПочему это будет полезно?\n\n+ Знакомство с моделями и этапами адаптации\n+ Осознание своего внутреннего состояния\n+ Анализ типичных проблем адаптации\n+ Овладение механизмами и инструментами облегчения адаптации',
  date: '19.9.2025',
  time: '14:00-15:00',
};

type DateFormatterProps = {
  dateString: string;
}

function DateFormatter({ dateString }: DateFormatterProps) {
    const formattedDate = useMemo(() => {
        const date = new Date(dateString.split('.').reverse().join('-'));

        const formatted = new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
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
            <Link to="/events" className="back-link">← Назад к списку событий</Link>

            <article className="event-item">
                <h1>{EventData.title}</h1>

                <div className="event-item-datetime">
                    <div className="datetime-item">
                        <img src="/Date.svg" alt="Дата" className="datetime-icon" />
                        Дата: <DateFormatter dateString={EventData.date} />
                    </div>
                    <div className="datetime-item">
                        <img src="/Time.svg" alt="Дата" className="datetime-icon" />
                        Время: {EventData.time}
                    </div>
                </div>

                <div className="event-item-content">
                    <Linkify>{EventData.content}</Linkify>
                </div>

                <EnrollButton />
            </article>
        </div>
    );
}