import type { JSX } from 'react';
import './CourseCard.css';
type CourseCardType = {
  id: number;
  title: string;
  cost: string;
};

export default function CourseCard({ id, title, cost }: CourseCardType): JSX.Element {
  return (
    <div key={id} className='course-card'>
      <div className='course-image'>{/*изображение*/}</div>
      <div className='course-content'>
        <div className='course-title'>{title}</div>
        <p className='course-description'>{cost}</p>
      </div>
    </div>
  );
}
