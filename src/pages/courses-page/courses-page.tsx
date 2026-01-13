import { useMemo, type JSX } from 'react';
import './courses-page.css';
import { Card, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/Courses/useCourses';
import Button from '../../components/Button/Button';
import { RequireAuth } from '../../components/RequireAuth/RequireAuth';
import { RequireRole } from '../../components/RequireRole/RequireRole';
const { Meta } = Card;
const { Search } = Input;

export default function Courses(): JSX.Element {
  const navigate = useNavigate();

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
        <div className='buttonCreatePost'>
          <RequireAuth>
            <RequireRole allowedRoles={['admin', 'superadmin']} fallbackPath='/unauthorized'>
              <Link to='/create-course'>
                <Button text={'Создать курс'}></Button>
              </Link>
            </RequireRole>
          </RequireAuth>
        </div>
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
              key={course.id}
              hoverable
              cover={<img draggable={false} alt={course.id} src={course.imageUrl} />}
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <Meta title={course.name} description={course.price.toString()} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
