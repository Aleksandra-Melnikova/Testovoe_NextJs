'use client';

import React, { useState } from 'react';
import {useAppDispatch, useAppSelector} from "@/src/store/hooks";
import {clearCart, selectCartItems, selectLoadingSubmit, selectSubmitError} from "@/src/store/slices/CartSlice";
import {submitOrder} from "@/src/store/thunks/CartThunk";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const OrderForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCartItems);
    const submitLoading = useAppSelector(selectLoadingSubmit);
    const submitError = useAppSelector(selectSubmitError);
    const [error, setError] = useState<string | null>(null);

    const [phone, setPhone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Сбрасываем ошибку при новой попытке отправки

        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length !== 11) {
            setError('Введите корректный номер телефона');
            return;
        }

        if (cart.length === 0) {
           toast.error('Добавьте товары в корзину')
            return;
        }

        try {
            const resultAction = await dispatch(submitOrder({
                phone: cleanPhone,
                cart: cart.map(item => ({ id: item.id, quantity: item.quantity }))
            }));

            if (submitOrder.fulfilled.match(resultAction)) {
                dispatch(clearCart());
                onSuccess();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={'row align-items-center justify-content-between card-body'}>
            <div className={`mb-3 ${submitError || error ? 'has-error' : ''} col-8`}>
                <label htmlFor="phone" className="form-label">Телефон</label>
                <input
                    aria-placeholder="+7 (999) 999-99-99"
                    className={`form-control ${submitError || error ? 'is-invalid' : ''}`}
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        setError(null); // Сбрасываем ошибку при изменении телефона
                    }}
                    placeholder="+7 (___) ___-__-__"
                />
                {(submitError || error) && (
                    <div className="invalid-feedback">
                        {submitError || error}
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="btn btn-secondary col-4 mt-3"
                disabled={submitLoading}
            >
                {submitLoading ? 'Отправка...' : 'Заказать'}
            </button>
        </form>
    );
};