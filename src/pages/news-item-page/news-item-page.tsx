import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import './news-item-page.css';
import PopupImage from '../../components/PopupImage/PopupImage';
import { Typography } from 'antd';

const { Title, Text } = Typography;

type NewsItemProps = {
  title: string;
  content: string;
  date: string;
  image?: string;
};

const NewsData: NewsItemProps = {
  title: 'Об организации и проведении школьного этапа ВсОШ 25/26',
  content:
    'Приказ №451-Д Министерства образования Свердловской области от 04.09.2025 "Об организации и проведении школьного этапа всероссийской олимпиады школьников в Свердловской области в 2025/2026 учебном году"\n\nЕще больше информации о ВСОШ размещается здесь https://domuchitela.profiedu.ru/?section_id=229',
  date: '15.11.2025',
  image: '/5472179671505434589.jpg',
};

export default function NewsItem(): JSX.Element {
  return (
    <div className='page-item-container'>
      <Link to='/news' className='back-link'>
        ← Назад к списку новостей
      </Link>

      <article className='news-item'>
        <Title>{NewsData.title}</Title>
        <Text type='secondary' className='news-date'>
          {NewsData.date}
        </Text>
        <div className='news-images'>
          {NewsData.image && <PopupImage src={NewsData.image} />}
          {NewsData.image && <PopupImage src={NewsData.image} />}
        </div>
        <div className='news-item-content'>
          <Linkify>
            <Text>{NewsData.content}</Text>
          </Linkify>
        </div>
      </article>
    </div>
  );
}
