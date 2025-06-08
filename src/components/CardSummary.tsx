'use client';

import { useAppSelector } from "@/src/store/hooks";
import { selectCartItems } from "@/src/store/slices/CartSlice";
import { useEffect, useState } from 'react';

export const CartSummary = () => {
    const [isClient, setIsClient] = useState(false);
    const cart = useAppSelector(selectCartItems);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formatPrice = (price: number) => {
        return price.toLocaleString('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    if (cart.length === 0) {
        return (
            <div className="card-body">
                <h3 className="card-title fw-medium text-center text-sm-start">
                    Корзина пуста
                </h3>
            </div>
        );
    }

    return (
        <div className="card-body">
            <h3 className="card-title fw-medium text-center text-sm-start">
                Добавленные товары
            </h3>
            <div className="mb-1">
                {cart.map(item => (
                    <div key={`${item.id}-${item.quantity}`} className="d-flex justify-content-between mb-2">
                        <div>
                            <span className="fw-medium fs-6">{item.name}</span>
                            <span className="text-muted ms-2">x{item.quantity}</span>
                        </div>
                        <div>
                            {formatPrice(item.price * item.quantity)} ₽
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-top pt-2">
                <div className="d-flex justify-content-between">
                    <span>Товаров:</span>
                    <span>{totalItems}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                    <span>Общая сумма:</span>
                    <span>{formatPrice(totalPrice)} ₽</span>
                </div>
            </div>
        </div>
    );
};