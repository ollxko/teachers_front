import { type JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Spin, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './news-item-page.css';
import { useNewsItem } from '../../hooks/News/useNewsItem';
import { MdxRenderer } from '../../components/MdxRenderer/MdxRenderer';

const { Title, Text } = Typography;

export default function NewsItemPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { newsItem, loading, error } = useNewsItem(id);

  if (!newsItem) {
    return (
      <div className='news-item-page'>
        <div className='page-header'>
          <Link to='/news' className='back-button'>
            <ArrowLeftOutlined /> Назад к новостям
          </Link>
        </div>

        <Alert message='Ошибка' description={error || 'Новость не найдена'} type='error' showIcon />
      </div>
    );
  }

  return (
    <div className="page-item-container">
      <Link to="/news" className="back-link">
        ← Назад к списку новостей
      </Link>

      <article className="news-item">
        <Title>{newsItem.title}</Title>
        <Text type="secondary" className="news-date">
          {newsItem.date}
        </Text>
        
        <div className="news-item-content">
          <MdxRenderer content={newsItem.content} />
        </div>
      </article>
    </div>
  );
}
