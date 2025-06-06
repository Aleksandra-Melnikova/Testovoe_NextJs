'use client';
import { useState } from 'react';
import axios from 'axios';
import {useCart} from "@/src/hooks/useCart";

export const OrderForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const { cart } = useCart();
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
                localStorage.removeItem('cart');
                onSuccess();
            } else {
                setError(response.data.error || 'Ошибка при оформлении заказа');
            }
        } catch (err) {
            setError('Ошибка при отправке заказа');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`mb-3 ${error ? 'has-error' : ''}`}>
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
                className="btn btn-primary"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Отправка...' : 'Заказать'}
            </button>
        </form>
    );
};