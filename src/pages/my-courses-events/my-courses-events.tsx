// pages/MyCoursesPage/MyCoursesPage.tsx
import { type JSX } from 'react';
import { Layout, Row, Col, Input, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import EventCard from '../../components/EventCard/EventCard';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './my-courses-events.css';

const { Content } = Layout;
const { Search } = Input;
const { Meta } = Card;

// Моковые данные для примеров
const mockCourses = [
  {
    id: 1,
    title: 'React разработка с нуля',
    cost: '15 000 ₽',
    image: 'https://habrastorage.org/webt/yl/fm/i1/ylfmi1fkdkyqbnkc0tj9szkazwu.jpeg',
  },
  {
    id: 2,
    title: 'Python для анализа данных',
    cost: '20 000 ₽',
    image: 'https://habrastorage.org/webt/yl/fm/i1/ylfmi1fkdkyqbnkc0tj9szkazwu.jpeg',
  },
  {
    id: 3,
    title: 'Дизайн интерфейсов',
    cost: '18 000 ₽',
    image: 'https://habrastorage.org/webt/yl/fm/i1/ylfmi1fkdkyqbnkc0tj9szkazwu.jpeg',
  },
];

const mockEvents = [
  {
    id: 1,
    title:
      'Приглашаем вас на открытые уроки народной артистки РФ Марины Мещеряковой с 17-22 ноября в зал Российского фонда культуры.С 17 — 22 ноября народная артистка РФ, оперная певица с мировым именем, проведёт открытые уроки для молодых профессиональных музыкантов, успешно прошедших отбор для участия.',
    time: '14:00',
    address: 'МАОУ СОШ 100',
    image: 'https://img-fotki.yandex.ru/get/55231/129367479.254/0_13ed59_bd9ed3d8_X4L.jpg',
  },
  {
    id: 2,
    title: 'Cобытие 1',
    time: '14:00',
    address: 'МАОУ СОШ 100',
    image: 'https://img-fotki.yandex.ru/get/55231/129367479.254/0_13ed59_bd9ed3d8_X4L.jpg',
  },
];

export default function MyCoursesPage(): JSX.Element {
  const handleViewAllCourses = () => {
    console.log('Переход ко всем курсам');
    // Навигация на страницу со всеми курсами
  };

  const handleViewAllEvents = () => {
    console.log('Переход ко всем событиям');
    // Навигация на страницу со всеми событиями
  };

  const handleCourseClick = (courseId: number) => {
    console.log('Клик по курсу:', courseId);
    // Навигация на страницу курса
  };

  const handleEventClick = (eventTitle: string) => {
    console.log('Клик по событию:', eventTitle);
    // Навигация на страницу события
  };

  const onSearch = (value: string) => {
    console.log('Поиск:', value);
    // Логика поиска
  };

  return (
    <Layout className='my-courses-page'>
      <Content className='page-content'>
        <div className='container'>
          {/* Поиск */}
          <div className='search-container'>
            <Search
              placeholder='Введите текст для поиска'
              allowClear
              size='middle'
              onSearch={onSearch}
              style={{ maxWidth: 400 }}
            />
          </div>

          {/* Секция курсов */}
          <div className='section-header'>
            <h2 className='section-title'>Мои курсы</h2>
            <button type='button' className='section-button' onClick={handleViewAllCourses}>
              Перейти ко всем
              <RightOutlined />
            </button>
          </div>

          <Row gutter={[24, 24]} className='courses-grid'>
            {mockCourses.slice(0, 9).map(course => (
              <Col xs={24} sm={12} md={8} lg={8} key={course.id}>
                <Card
                  hoverable
                  className='course-card'
                  cover={
                    <img
                      draggable={false}
                      alt={course.title}
                      src={course.image}
                      className='course-card-image'
                    />
                  }
                  onClick={() => handleCourseClick(course.id)}
                >
                  <Meta
                    title={<div className='course-card-title'>{course.title}</div>}
                    description={<div className='course-card-cost'>{course.cost}</div>}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {/* Секция событий - полная ширина */}
          <div className='section-header'>
            <h2 className='section-title'>Мои события</h2>
            <button type='button' className='section-button' onClick={handleViewAllEvents}>
              Перейти ко всем
              <RightOutlined />
            </button>
          </div>

          <div className='full-width-events-container'>
            <div className='event-cards-container'>
              {mockEvents.map(({ id, title, time, address, image }) => (
                <EventCard key={id} image={image} title={title} tag={'Онлайн'} />
              ))}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
