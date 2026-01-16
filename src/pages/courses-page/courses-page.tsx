import { useMemo, type JSX } from 'react';
import './courses-page.css';
import { Card, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/Courses/useCourses';
import Button from '../../components/Button/Button';
import { RequireAuth } from '../../components/RequireAuth/RequireAuth';
import { RequireRole } from '../../components/RequireRole/RequireRole';
import { useSelector } from 'react-redux';
import { hasAnyRole, selectCurrentUser } from '../../store/slices/authSlice';
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
  const user = useSelector(selectCurrentUser);
  const isAdmin = hasAnyRole(user, ['admin', 'superadmin']);

  return (
    <div className='courses-page'>
      <div className='courses-сontainer'>
        {isAdmin && (
          <div className='buttonCreatePost'>
            <Link to='/create-course'>
              <Button text={'Создать курс'}></Button>
            </Link>
          </div>
        )}
        <div className='courses-title'>Курсы Екатеринбургского Дома Учителя</div>

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
