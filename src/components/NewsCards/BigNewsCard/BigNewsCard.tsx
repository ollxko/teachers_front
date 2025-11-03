import type { JSX } from 'react';
import './BigNewsCard.css';
type BigNewsCardProps = {
  title: string;
  date: string;
};
export default function BigNewsCard({ title, date }: BigNewsCardProps): JSX.Element {
  return (
    <div className='big-card'>
      <div className='titleImg'>
        <div className='inner-rectangle'></div>
        <div className='title-news'>{title}</div>
      </div>
      <div className='date'>{date}</div>
    </div>
  );
}
