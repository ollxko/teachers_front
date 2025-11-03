import type { JSX } from 'react';
import { useState } from 'react';
import './EnrollButton.css'

export default function EnrollButton(): JSX.Element {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className='enroll'>
            <button className='enroll-button'>Записаться</button>

            <button className={`enroll-like ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill={isLiked ? 'currentColor' : 'none'}
                    stroke='currentColor'
                    strokeWidth='2'
                >
                    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                </svg>
            </button>
        </div>
    );
}