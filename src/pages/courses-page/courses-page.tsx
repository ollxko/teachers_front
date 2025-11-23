import type { JSX } from 'react';
import './courses-page.css';
import CourseCard from '../../components/CourseCard/CourseCard';
import { Card, Input } from 'antd';
const { Meta } = Card;
const { Search } = Input;

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
          {courses.map(({ id, title, cost }) => (
            <Card
              key={id}
              hoverable
              cover={
                <img
                  draggable={false}
                  alt='example'
                  src='https://habrastorage.org/webt/yl/fm/i1/ylfmi1fkdkyqbnkc0tj9szkazwu.jpeg'
                />
              }
            >
              <Meta title={title} description={cost} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
