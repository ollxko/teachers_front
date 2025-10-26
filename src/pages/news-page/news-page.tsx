import type { JSX } from 'react';
import './news-page.css';
import BigNewsCard from '../../components/NewsCards/BigNewsCard/BigNewsCard';

export default function News(): JSX.Element {
  return (
    <div className='news-сontainer'>
      <div className='first-line-container'>
        <BigNewsCard title={'Новость'} date={'10.10'} />
        <div className='small-cards-container'>
          <div className='small-card'>
            <div className='title-news'>Новость</div>
            <div className='small-inner-rectangle'></div>
          </div>
          <div className='small-card'>
            <div className='title-news'>Новость</div>
            <div className='small-inner-rectangle'></div>
          </div>
          <div className='small-card'>
            <div className='title-news'>Новость</div>
            <div className='small-inner-rectangle'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
