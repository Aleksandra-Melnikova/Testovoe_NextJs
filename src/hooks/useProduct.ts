import { useState } from 'react';
import axios from 'axios';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = async (page: number) => {
        const res = await axios.get(`http://o-complex.com:1337/products?page=${page}&page_size=20`);
        setProducts(prev => [...prev, ...res.data.items]);
        return res.data.items;
    };

    return { products, loadProducts };
};