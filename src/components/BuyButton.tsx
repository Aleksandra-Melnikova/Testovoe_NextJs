'use client';

import { useCart } from "@/src/hooks/useCart";
import React from "react";

export const BuyButton = ({ productId }: { productId: number }) => {
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
    const currentItem = cart.find(item => item.id === productId);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity)) {
            updateQuantity(productId, newQuantity);
        }
    };

    if (currentItem) {
        return (
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                        if (currentItem.quantity === 1) {
                            removeFromCart(productId);
                        } else {
                            updateQuantity(productId, currentItem.quantity - 1);
                        }
                    }}
                >
                    -
                </button>
                <input
                    type="number"
                    min="1"
                    value={currentItem.quantity}
                    onChange={handleQuantityChange}
                    className="form-control mx-2 text-center"
                    style={{ width: '60px' }}
                />
                <button
                    className="btn btn-outline-success"
                    onClick={() => updateQuantity(productId, currentItem.quantity + 1)}
                >
                    +
                </button>
            </div>
        );
    }

    return (
        <button
            className="btn btn-primary"
            onClick={() => addToCart(productId)}
        >
            Купить
        </button>
    );
};