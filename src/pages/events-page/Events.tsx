import { type JSX } from 'react';
import './Events.css';

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
        <div key={id} className='card'>
          <div className='card-content'>
            <div className='text-section'>
              <div className='event-name'>{title}</div>
              <div className='time-address-container'>
                <div>{time}</div>
                <div>{address}</div>
              </div>
            </div>
            <div className='image-section'>
              <img src={image} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
