'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {ProductItem} from "@/src/components/ProductItem";

interface ApiResponse {
    page: number;
    amount: number;
    total: number;
    items: Product[];
}

export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await axios.get<ApiResponse>(
                    `http://o-complex.com:1337/products?page=${page}&page_size=20`
                );

                if (res.data.items.length === 0) {
                    setHasMore(false);
                    return;
                }

                setProducts(prev => [...prev, ...res.data.items]);
            } catch (error) {
                console.error('Ошибка загрузки товаров:', error);
            }
        };

        if (hasMore) {
            void loadProducts();
        }
    }, [page, hasMore]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [hasMore]);


    return (
        <div className="row flex-wrap p-3 g-3 rounded-2 g-4 mx-auto">
            {products.map(product => (
                <div key={product.id + product.title} className="col mx-auto justify-content-center">
                    <ProductItem product={product} />
                </div>
            ))}
            {hasMore && (
                <div ref={loaderRef} className="col-12 py-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

