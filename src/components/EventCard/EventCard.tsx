import type { JSX } from 'react';
import './EventCard.css';
type EventCardPropsType = {
  id: number;
  title: string;
  time: string;
  address: string;
  image: string;
};

export default function EventCard({
  id,
  title,
  time,
  address,
  image,
}: EventCardPropsType): JSX.Element {
  return (
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
  );
}
