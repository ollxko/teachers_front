import type { JSX } from 'react';
import './course-item-page.css';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import EnrollButton from '../../components/EnrollButton/EnrollButton';

type CourseItemProps = {
  title: string;
  content: string;
  cost: number;
  image?: string;
};

const CourseData: CourseItemProps = {
  title: 'Название курса',
  content: 'Описание курса',
  cost: 5000,
  image: '/5472179671505434589.jpg',
};

export default function CourseItem(): JSX.Element {
  const formatCost = (cost: number): string => {
    return cost.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <div className='course-item-container'>
      <Link to='/courses' className='back-link'>
        ← Назад к списку курсов
      </Link>

      <div className='course-layout'>
        <div className='course-info'>
          <article className='course-item'>
            <h1>{CourseData.title}</h1>
            <div className='course-item-content'>
              <Linkify>{CourseData.content}</Linkify>
            </div>
          </article>
        </div>

        <div className='course-sidebar'>
          {CourseData.image && (
            <div className='course-image-container'>
              <img src={CourseData.image} alt={CourseData.title} className='course-item-image' />
            </div>
          )}

          <EnrollButton/>

          <div className='course-cost'>{formatCost(CourseData.cost)}</div>
        </div>
      </div>
    </div>
  );
}
