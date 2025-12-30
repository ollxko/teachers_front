import { useMemo, type JSX } from 'react';
import './news-page.css';
import NewsCard from '../../components/NewsCards/NewsCard/NewsCard';
import { useNews } from '../../hooks/useNews';
import { formatDate } from '../../utils/dateFormatter';

export default function News(): JSX.Element {
  const params = useMemo(
    () => ({
      take: 10,
    }),
    []
  );

  const { news, loading, error } = useNews(params);

  return (
    <div className='news-сontainer'>
      <div className='next-line-container'>
        {news.map(item => (
          <NewsCard title={item.title} date={formatDate(item.createdAt)} image='' size='medium' />
        ))}
      </div>
    </div>
  );
}
