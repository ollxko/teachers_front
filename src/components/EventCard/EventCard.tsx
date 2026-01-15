import React, { type JSX } from 'react';
import { Card, Tag } from 'antd';
import ClockIcon from '../../components/icons/clock.svg';
import LocationIcon from '../../components/icons/location.svg';
import './EventCard.css';

export type EventCardProps = {
  image: string;
  title: string;
  tag: string;
  tagColor?: string;
  actions?: Array<{
    icon: React.ReactNode;
    onClick: () => void;
    tooltip?: string;
  }>;
  footer?: React.ReactNode;
  loading?: boolean;
  className?: string;
  onCardClick?: () => void;
  size?: 'default' | 'small';
  address: string;
  date: string;
  time: string;
};

export default function EventCard({
  image,
  title,
  tag,
  tagColor = 'blue',
  loading = false,
  className = '',
  onCardClick,
  size = 'default',
  address,
  date,
  time,
}: EventCardProps): JSX.Element {
  const cardClassNames = [
    'custom-card',
    `card-size-${size}`,
    className,
    onCardClick ? 'clickable-card' : '',
  ]
    .join(' ')
    .trim();

  return (
    <Card
      className={cardClassNames}
      loading={loading}
      cover={
        <div className='card-image-container'>
          <img src={image} className='card-image' />
        </div>
      }
      onClick={onCardClick}
    >
      <div className='card-body'>
        <Tag color={tagColor} className='card-tag'>
          {tag}
        </Tag>
        <div className='card-content'>
          <div className='card-title-container'>
            <h5 className='card-title'>{title}</h5>
          </div>
          <div className='time-address-container'>
            <div className='time-container'>
              <img className='clock-svg' src={ClockIcon} alt={'Clock'} />
              <h5>{time + '  ' + date}</h5>
            </div>
            {address && (
              <div className='address-container'>
                <img className='location-svg' src={LocationIcon} alt={'Location'} />
                <h5>{address}</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
