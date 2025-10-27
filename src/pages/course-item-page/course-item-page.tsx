import type { JSX } from 'react';
import { useState } from 'react';
import './course-item-page.css'
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';

type CourseItemProps = {
    title: string;
    content: string;
    cost: number;
    image?: string;
}

const CourseData: CourseItemProps = {
    title: 'Название курса',
    content: 'Описание курса',
    cost: 5000,
    image: '/5472179671505434589.jpg'
}

export default function CourseItem(): JSX.Element {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const formatCost = (cost: number): string => {
        return cost.toLocaleString('ru-RU') + ' ₽';
    };

    return (
        <div className="course-item-container">
            <Link to="/courses" className="back-link">← Назад к списку курсов</Link>
            
            <div className="course-layout">
                <div className="course-info">
                    <article className="course-item">
                        <h1>{CourseData.title}</h1>
                        <div className="course-item-content">
                            <Linkify>{CourseData.content}</Linkify>
                        </div>
                    </article>
                </div>

                <div className="course-sidebar">
                    {CourseData.image && (
                        <div className="course-image-container">
                            <img 
                                src={CourseData.image} 
                                alt={CourseData.title}
                                className="course-item-image"
                            />
                        </div>
                    )}
                    
                    <div className="course-actions">
                        <button className="enroll-button">
                            Записаться
                        </button>
                        
                        <button 
                            className={`like-button ${isLiked ? 'liked' : ''}`}
                            onClick={handleLike}
                        >
                            <svg 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill={isLiked ? "currentColor" : "none"}
                                stroke="currentColor" 
                                strokeWidth="2"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </button>
                    </div>

                    <div className="course-cost">
                        {formatCost(CourseData.cost)}
                    </div>
                </div>
            </div>
        </div>
    );
}