import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import './news-item-page.css';
import PopupImage from '../../components/PopupImage/PopupImage';

type NewsItemProps = {
  title: string;
  content: string;
  date: string;
  image?: string;
}

const NewsData: NewsItemProps = {
  title: 'Об организации и проведении школьного этапа ВсОШ 25/26',
  content: 'Приказ №451-Д Министерства образования Свердловской области от 04.09.2025 "Об организации и проведении школьного этапа всероссийской олимпиады школьников в Свердловской области в 2025/2026 учебном году"\n\nЕще больше информации о ВСОШ размещается здесь https://domuchitela.profiedu.ru/?section_id=229',
  date: '2025-09-10',
  image: '/5472179671505434589.jpg'
}

export default function NewsItem(): JSX.Element {
  return (
    <div className="news-item-container">
      <Link to="/news" className="back-link">← Назад к списку новостей</Link>
      <article className="news-item">
        <h1>{NewsData.title}</h1>
        <time className="news-date">{NewsData.date}</time>
        <div className="news-content">
          <Linkify>{NewsData.content}</Linkify>
        </div>

        {NewsData.image && <PopupImage src={NewsData.image}/>}

      </article>
    </div>
  );
}