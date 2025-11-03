import type { JSX } from 'react';
import './news-page.css';
import BigNewsCard from '../../components/NewsCards/BigNewsCard/BigNewsCard';
import SmallNewsCard from '../../components/NewsCards/SmallNewsCard/SmallNewsCard';

export default function News(): JSX.Element {
  return (
    <div className='news-сontainer'>
      <div className='first-line-container'>
        <BigNewsCard title={'Новость'} date={'10.10'} />
        <div className='small-cards-container'>
          <SmallNewsCard title={'Новость'} date={'10.10'} />
          <SmallNewsCard title={'Новость'} date={'10.10'} />
          <SmallNewsCard title={'Новость'} date={'10.10'} />
        </div>
      </div>
    </div>
  );
}
