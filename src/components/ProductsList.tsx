'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ProductItem } from "@/src/components/ProductItem";
import { fetchProducts } from "@/src/store/thunks/ProductThunk";
import {
    selectHasMoreProducts,
    selectLoadingProducts,
    selectProductItems,
    selectProductsPage
} from "@/src/store/slices/ProductSlice";

export const ProductList = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectProductItems);
    const hasMore = useAppSelector(selectHasMoreProducts);
    const loading = useAppSelector(selectLoadingProducts);
    const currentPage = useAppSelector(selectProductsPage);
    const loaderRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const loadMoreProducts = useCallback(() => {
        if (hasMore && !loading) {
            dispatch(fetchProducts(currentPage));
        }
    }, [dispatch, hasMore, loading, currentPage]);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const options = {
            root: null,
            rootMargin: '300px',
            threshold: 0.1
        };

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreProducts();
            }
        }, options);

        if (loaderRef.current && hasMore) {
            observerRef.current.observe(loaderRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMoreProducts, hasMore]);

    useEffect(() => {
        if (items.length === 0 && !loading) {
            loadMoreProducts();
        }
    }, [items.length, loading, loadMoreProducts]);

    return (
        <div className="row flex-wrap g-3 rounded-2 mx-auto">
            {items.map(product => (
                <div key={`${product.id}-${product.title} + ${Math.floor(Math.random() * 10000) + 1}`} className="col mx-auto justify-content-center">
                    <ProductItem product={product} />
                </div>
            ))}
            {hasMore && (
                <div ref={loaderRef} className="col-12 py-4 text-center">
                    {loading && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};