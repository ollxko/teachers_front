import { type JSX } from 'react';
import './events-page.css';
import EventCard from '../../components/EventCard/EventCard';
import Calendar from '../../components/Calendar/Calendar.tsx';
import SearchPlaceholder from '../../components/SearchPlaceholder/SearchPlaceholder.tsx';

export default function Events(): JSX.Element {
  const cardsData = [
    {
      id: 1,
      title: 'Cобытие 1',
      time: '14:00',
      address: 'МАОУ СОШ 100',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      title: 'Cобытие 2',
      time: '14:00',
      address: 'МАОУ СОШ 100',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      title: 'Cобытие 3',
      time: '14:00',
      address: 'МАОУ СОШ 100',

      image: 'https://via.placeholder.com/80',
    },
  ];

  return (
    <div className='events-page'>
      <div className='events-page-container'>
        <div className='events-title'>События Екатеринбуржского Дома Учителя</div>
        <div className='calendar-search'>
          <Calendar />
          <SearchPlaceholder />
        </div>
        <div className='event-cards-container'>
          {cardsData.map(({ id, title, time, address, image }) => (
            <EventCard id={id} title={title} time={time} address={address} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
