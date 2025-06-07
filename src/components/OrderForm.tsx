'use client';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { clearCart, selectCartItems, selectLoadingSubmit, selectSubmitError } from "@/src/store/slices/CartSlice";
import { submitOrder } from "@/src/store/thunks/CartThunk";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IMaskInput } from 'react-imask';

export const OrderForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCartItems);
    const submitLoading = useAppSelector(selectLoadingSubmit);
    const submitError = useAppSelector(selectSubmitError);
    const [error, setError] = useState<string | null>(null);
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (value: string) => {
        setPhone(value);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length !== 11) {
            setError('Введите корректный номер телефона (11 цифр)');
            return;
        }

        if (cart.length === 0) {
            toast.error('Добавьте товары в корзину');
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
        <form onSubmit={handleSubmit} className={'row align-items-start justify-content-between card-body pb-0 fs-2'}>
            <div className={`${submitError || error ? 'has-error' : ''} col-8`}>
                <IMaskInput
                    mask="+7 (000) 000-00-00"
                    value={phone}
                    onAccept={(value: string) => handlePhoneChange(value)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange(e.target.value)}
                    className={`form-control ${submitError || error ? 'is-invalid' : ''} mask-phone`}
                    style={{
                        backgroundColor: 'var(--bs-primary)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}
                    placeholder="+7 (___) ___-__-__"
                    inputMode="tel"
                />
                {(submitError || error) && (
                    <div className="invalid-feedback fs-6">
                        {submitError || error}
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="btn col-4"
                style={{backgroundColor: 'var(--bs-primary)', color: 'white'}}
                disabled={submitLoading}
            >
                {submitLoading ? 'Отправка...' : 'Заказать'}
            </button>
        </form>
    );
};