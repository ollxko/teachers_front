import type { JSX } from 'react';
import './NewsCard.css'
import { Card } from 'antd';

export type NewsCardProps = {
	image: string;
	title: string;
	date: string;
	size: 'big' | 'medium' | 'small';
}

export default function EventCard({image, title, date, size='small'}: NewsCardProps): JSX.Element {
	return (
		<Card
			className={['news-card', `card-size-${size}`].join(' ').trim()}
			cover={
				<div className='news-card-image-container'>
					<img
						src={'https://n1s1.hsmedia.ru/a5/17/1c/a5171c9e345e8c758452d23c2823bb15/2999x1995_0xIVRrPeGM_4566257777712071409.jpg'}
						className='news-card-image'
					/>
				</div>
			}
		>
			<p>{date}</p>
			<h1>{title}</h1>
		</Card>
	)
}