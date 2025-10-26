import { type JSX } from 'react';
import './events-page.css';
import EventCard from '../../components/EventCard/EventCard';

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
    <div className='cards-container'>
      {cardsData.map(({ id, title, time, address, image }) => (
        <EventCard id={id} title={title} time={time} address={address} image={image} />
      ))}
    </div>
  );
}
