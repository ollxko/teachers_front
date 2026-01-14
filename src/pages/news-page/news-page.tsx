import { useMemo, type JSX } from 'react';
import './news-page.css';
import NewsCard from '../../components/NewsCards/NewsCard/NewsCard';
import { useNews } from '../../hooks/News/useNews';
import { formatDate } from '../../utils/dateFormatter';
import { Link } from 'react-router-dom';
import { RequireAuth } from '../../components/RequireAuth/RequireAuth';
import { RequireRole } from '../../components/RequireRole/RequireRole';
import Button from '../../components/Button/Button';

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
      <div className='buttonCreatePost'>
        <RequireAuth>
          <RequireRole allowedRoles={['admin', 'superadmin']} fallbackPath='/unauthorized'>
            <Link to='/create-news'>
              <Button text={'Создать новость'}></Button>
            </Link>
          </RequireRole>
        </RequireAuth>
      </div>
      <div className='next-line-container'>
        {news.map(item => (
          <Link to={`/news/${item.postId}`}>
            <NewsCard title={item.title} date={formatDate(item.createdAt)} image={item.imageUrl} size='medium' />
          </Link>
        ))}
      </div>
    </div>
  );
}
