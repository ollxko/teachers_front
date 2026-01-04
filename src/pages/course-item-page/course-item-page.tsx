import type { JSX } from 'react';
import './course-item-page.css';
import { Link } from 'react-router-dom';
import { Tag, Typography } from 'antd';
import Linkify from 'react-linkify';
import EnrollButton from '../../components/EnrollButton/EnrollButton';

const { Title, Text } = Typography;

type CourseItemProps = {
  title: string;
  description: string;
  program: string;
  cost: number;
  image?: string;
};

const CourseData: CourseItemProps = {
  title: 'Использование современных технологий в образовательном процессе',
  description: 'Знакомство с актуальными инновационными методами и технологиями, соответствующими требованиям нового Федеральной образовательной программы дошкольного образования (ФОП ДО).',
  program: 'Инновационные практики в контексте реализации ФОП ДО Использование практик развития субъектности у детей дошкольного возраста в деятельности ДОО Личностное развитие ребенка старшего дошкольного возраста в аспекте формирования основ «гибких» навыков Личностно-ориентированная технология, приемы и подходы развития познавательной активности у детей дошкольного возраста Достижение преемственности целей, задач и содержания образования в рамках реализации рабочих программ воспитания ДО и НОО Использование приемов мультипликации в образовательной деятельности Формирование основ финансовой грамотности детей дошкольного возраста Профессиональное совершенствование педагога в системе конкурсного движения: сопровождение и современная практика. Развитие компонентов методической компетентности педагога',
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
            <Title>{CourseData.title}</Title>
            <Tag color={"purple"}>{"Онлайн"}</Tag>
            <Tag color={"blue"}>{"36 часов"}</Tag>
            <div className='course-item-content'>
              <Title level={2}>{"Описание курса"}</Title>
              <Linkify><Text>{CourseData.description}</Text></Linkify>
              <Title level={2}>{"Программа курса"}</Title>
              <Linkify><Text>{CourseData.program}</Text></Linkify>
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

          <Text className='course-cost'>{formatCost(CourseData.cost)}</Text>
        </div>
      </div>
    </div>
  );
}
