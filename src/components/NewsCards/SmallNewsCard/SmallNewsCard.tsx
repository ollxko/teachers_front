import type { JSX } from 'react';
import './SmallNewsCard.css';
type SmallNewsCardProps = {
  title: string;
  date: string;
};
export default function SmallNewsCard({ title, date }: SmallNewsCardProps): JSX.Element {
  return (
    <div className='small-card'>
      <div className='titleDate'>
        <div className='title-news'>{title}</div>
        <div className='date'>{date}</div>
      </div>
      <div className='small-inner-rectangle'></div>
    </div>
  );
}
