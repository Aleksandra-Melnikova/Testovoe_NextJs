'use client';

import { useState } from 'react';

interface CartItem {
    id: number;
    quantity: number;
}

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const updateCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const addToCart = (productId: number) => {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            updateCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            updateCart([...cart, { id: productId, quantity: 1 }]);
        }
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            updateCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            ));
        } else if (newQuantity >= 1) {
            updateCart([...cart, { id: productId, quantity: newQuantity }]);
        }
    };

    const removeFromCart = (productId: number) => {
        updateCart(cart.filter(item => item.id !== productId));
    };

    return {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart
    };
};