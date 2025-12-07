import type { JSX } from 'react';
import './news-page.css';
import NewsCard from '../../components/NewsCards/NewsCard/NewsCard';

export default function News(): JSX.Element {
	return (
		<div className='news-сontainer'>
			<div className='first-line-container'>
				<div className='big-card-container'>
					<NewsCard title={'Новость'} date={'10.10'} image='' size='big'/>
				</div>
				<div className='small-cards-container'>
					<NewsCard title={'Новость'} date={'10.10'} image='' size='small'/>
					<NewsCard title={'Новость'} date={'10.10'} image='' size='small'/>
					<NewsCard title={'Новость'} date={'10.10'} image='' size='small'/>
				</div>
			</div>
			<div className='next-line-container'>
				<NewsCard title={'Новость'} date={'10.10'} image='' size='medium'/>
				<NewsCard title={'Новость'} date={'10.10'} image='' size='medium'/>
				<NewsCard title={'Новость'} date={'10.10'} image='' size='medium'/>
			</div>
		</div>
	);
}
