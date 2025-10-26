import type { JSX } from 'react';
type BigNewsCardProps = {
  title: string;
  date: string;
};
export default function BigNewsCard({ title, date }: BigNewsCardProps): JSX.Element {
  return (
    <div className='big-card'>
      <div className='inner-rectangle'></div>
      <div className='title-news'>{title}</div>
    </div>
  );
}
