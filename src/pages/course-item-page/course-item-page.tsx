import type { JSX } from 'react';
import './course-item-page.css';
import { Link, useParams } from 'react-router-dom';
import { Tag, Typography } from 'antd';
import Button from '../../components/Button/Button';
import { useCourseItem } from '../../hooks/Courses/useCourseItem';
import { MdxRenderer } from '../../components/MdxRenderer/MdxRenderer';

const { Title, Text } = Typography;

export default function CourseItem(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { coursesItem, loading, error } = useCourseItem(id);

  const formatCost = (cost: number | undefined): string => {
    if (cost !== undefined) {
      return cost.toLocaleString('ru-RU') + ' ₽';
    }
    return '';
  };

  return (
    <div className='course-item-container'>
      <Link to='/courses' className='back-link'>
        ← Назад к списку курсов
      </Link>

      <div className='course-layout'>
        <div className='course-info'>
          <article className='course-item'>
            <Title>{coursesItem?.name}</Title>
            {/* <Tag color={'purple'}>{'Онлайн'}</Tag>
            <Tag color={'blue'}>{'36 часов'}</Tag> */}
            <div className='course-item-content'>
              <Title level={2}>{'Описание курса'}</Title>
              <MdxRenderer content={coursesItem?.description} />
            </div>
          </article>
        </div>

        <div className='course-sidebar'>
          {coursesItem?.imageUrl && (
            <div className='course-image-container'>
              <img
                src={coursesItem.imageUrl}
                alt={coursesItem?.name}
                className='course-item-image'
              />
            </div>
          )}

          <a href={coursesItem?.link}>
            <Button text='Ссылка на курс' />
          </a>

          <Text className='course-cost'>{formatCost(coursesItem?.price)}</Text>
        </div>
      </div>
    </div>
  );
}
