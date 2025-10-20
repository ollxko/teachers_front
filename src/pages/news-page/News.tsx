import type { JSX } from 'react';
import './News.css';

export default function News(): JSX.Element {
  return (
    <div className='news-сontainer'>
      <div className='first-line-container'>
        <div className='big-card'>
          <div className='inner-rectangle'></div>
          <div className='title-news'>Новость</div>
        </div>

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
