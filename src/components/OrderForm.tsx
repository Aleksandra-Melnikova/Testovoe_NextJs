'use client';
import React, { useState } from 'react';
import axios from 'axios';
import {clearCart} from "@/src/store/CartSlice";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from '../store/store';

export const OrderForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length !== 11) {
            setError('Введите полный номер телефона');
            return;
        }

        if (cart.length === 0) {
            setError('Добавьте товары в корзину');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await axios.post('http://o-complex.com:1337/order', {
                phone: cleanPhone,
                cart: cart.map(item => ({ id: item.id, quantity: item.quantity }))
            });

            if (response.data.success) {
                dispatch(clearCart()); // Очищаем корзину через Redux
                onSuccess();
            } else {
                setError(response.data.error || 'Ошибка при оформлении заказа');
            }
        } catch (err) {
            setError('Ошибка при отправке заказа');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={'row align-items-center justify-content-between card-body'}>
            <div className={`mb-3 ${error ? 'has-error' : ''} col-8`}>
                <label htmlFor="phone" className="form-label">Телефон</label>
                <input
                    aria-placeholder="+7 (999) 999-99-99"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
            <button
                type="submit"
                className="btn btn-secondary col-4 mt-3"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Отправка...' : 'Заказать'}
            </button>
        </form>
    );
};