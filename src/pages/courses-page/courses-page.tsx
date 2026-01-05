import { useMemo, type JSX } from 'react';
import './courses-page.css';
import { Card, Input } from 'antd';
import { useCourses } from '../../hooks/useCourses';
const { Meta } = Card;
const { Search } = Input;

export default function Courses(): JSX.Element {
  const params = useMemo(
    () => ({
      take: 10,
    }),
    []
  );

  const { courses, loading, error } = useCourses(params);

  return (
    <div className='courses-page'>
      <div className='courses-сontainer'>
        <Search
          className='search'
          placeholder='Введите текст для поиска'
          allowClear
          size='middle'
          style={{ width: 300 }}
        />
        <div className='courses-grid'>
          {courses.map(course => (
            <Card
              key={course.courseId}
              hoverable
              cover={
                <img
                  draggable={false}
                  alt='example'
                  src={course.imageUrl}
                />
              }
            >
              <Meta title={course.name} description={course.price.toString()} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
