'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

interface Review {
    id: number;
    text: string;
}

export const ReviewsList = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://o-complex.com:1337/reviews');
                setReviews(response.data);
            } catch (err) {
                setError('Не удалось загрузить отзывы');
                console.error('Ошибка загрузки отзывов:', err);
            } finally {
                setLoading(false);
            }
        };

        void fetchReviews();
    }, []);

    if (loading) return <div className="text-center my-4">Загрузка отзывов...</div>;
    if (error) return <div className="text-center text-danger my-4">{error}</div>;
    if (reviews.length === 0) return <div className="text-center my-4">Отзывов пока нет</div>;

    return (
        <div className="container mt-5 pt-2">
            <div className="row mx-auto justify-content-around" >
                {reviews.map(review => (
                   <div className={"col-md-6 col-lg-4 mb-4 card g-3 h-100 p-3 flex-column justify-content-start" }
                        style={{ width: '321px', minHeight: '300px', backgroundColor:'#D9D9D9' }} key={review.id}>
                       <h3 className={'text-secondary'}>Отзыв {review.id}</h3>
                        <div
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.text) }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};