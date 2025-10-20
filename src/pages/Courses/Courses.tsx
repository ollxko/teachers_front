import type { JSX } from 'react';
import './Courses.css';

export default function Courses(): JSX.Element {
  const courses = [
    { id: 1, title: 'Курс 1', cost: '500$' },
    { id: 2, title: 'Курс 2', cost: '500$' },
    { id: 3, title: 'Курс 3', cost: '500$' },
    { id: 4, title: 'Курс 4', cost: '500$' },
    { id: 5, title: 'Курс 5', cost: '500$' },
    { id: 6, title: 'Курс 6', cost: '500$' },
    { id: 7, title: 'Курс 7', cost: '500$' },
    { id: 8, title: 'Курс 8', cost: '500$' },
    { id: 9, title: 'Курс 9', cost: '500$' },
  ];

  return (
    <div className='courses-сontainer'>
      <div className='courses-grid'>
        {courses.map(({ id, title, cost }) => (
          <div key={id} className='course-card'>
            <div className='course-image'>{/*изображение*/}</div>
            <div className='course-content'>
              <div className='course-title'>{title}</div>
              <p className='course-description'>{cost}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
