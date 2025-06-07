'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import DOMPurify from 'dompurify';
import {fetchReviews} from "@/src/store/thunks/RewiewThunk";

export const ReviewsList = () => {
    const dispatch = useAppDispatch();
    const { items: reviews, loading, error } = useAppSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    if (loading) return <div className="text-center my-4">Загрузка отзывов...</div>;
    if (error) return <div className="text-center text-danger my-4">{error}</div>;
    if (reviews.length === 0) return <div className="text-center my-4">Отзывов пока нет</div>;

    return (
        <div className="container mt-5 pt-2">
            <div className="row mx-auto justify-content-around">
                {reviews.map((review) => (
                    <div
                        className="col-md-6 col-lg-4 mb-4 card g-3 h-100 p-4 flex-column justify-content-start"
                        style={{
                            width: '321px',
                            minHeight: '300px',
                            backgroundColor: '#F8F9FA',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                        }}
                        key={review.id}
                    >
                        <h3 className="text-secondary mb-3" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                            Отзыв #{review.id}
                        </h3>

                        <div
                            className="review-content"
                            style={{
                                lineHeight: '1.6',
                                color: '#495057',
                                overflow: 'hidden',
                                flexGrow: 1
                            }}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(review.text)
                                    .replace(/<p>/g, '<p style="margin-bottom: 1rem;">')
                                    .replace(/<ul>/g, '<ul style="margin-bottom: 1rem; padding-left: 1.5rem;">')
                                    .replace(/<li>/g, '<li style="margin-bottom: 0.5rem;">')
                            }}
                        />

                        <style jsx>{`
      .review-content :global(p:last-child) {
        margin-bottom: 0;
      }
      .review-content :global(a) {
        color: #4361ee;
        text-decoration: underline;
      }
      .review-content :global(blockquote) {
        border-left: 3px solid #4361ee;
        padding-left: 1rem;
        margin-left: 0;
        color: #6c757d;
        font-style: italic;
      }
    `}</style>
                    </div>
                ))}
            </div>
        </div>
    );
};