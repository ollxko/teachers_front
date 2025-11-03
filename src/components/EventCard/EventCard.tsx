import type { JSX } from 'react';
import './EventCard.css';
import ClockIcon from '../icons/clock.svg';
import LocationIcon from '../icons/location.svg';
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
            <div className='time-container'>
              <img className='clock-svg' src={ClockIcon} alt={'Clock'} />
              <div>{time}</div>
            </div>
            <div className='address-container'>
              <img className='location-svg' src={LocationIcon} alt={'Location'} />
              <div>{address}</div>
            </div>
          </div>
        </div>
        <div className='image-section'>
          <img src={image} />
        </div>
      </div>
    </div>
  );
}
