'use client';
import React, { useState, useEffect } from 'react';
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
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const savedPhone = typeof window !== 'undefined' ? localStorage.getItem('orderPhone') : null;
        if (savedPhone) {
            setPhone(savedPhone);
        }
    }, []);

    useEffect(() => {
        if (hasMounted && phone) {
            localStorage.setItem('orderPhone', phone);
        }
    }, [phone, hasMounted]);


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
                // Очищаем сохраненный номер после успешного заказа
                localStorage.removeItem('orderPhone');
                dispatch(clearCart());
                onSuccess();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card-body pb-0">
            <div className="row g-3 align-items-start">
                <div className={`${submitError || error ? 'has-error' : ''} col-12 col-sm-8 `}>
                    <IMaskInput
                        mask="+7 (000) 000-00-00"
                        value={phone}
                        onAccept={(value: string) => handlePhoneChange(value)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange(e.target.value)}
                        className={`form-control ${submitError || error ? 'is-invalid' : ''} mask-phone`}
                        style={{
                            backgroundColor: 'var(--bs-primary)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                            width: '100%'
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

                <div className="col-12 col-sm-4">
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: 'var(--bs-primary)',
                            color: 'white',
                            height: '38px'
                        }}
                        disabled={submitLoading}
                    >
                        {submitLoading ? 'Отправка...' : 'Заказать'}
                    </button>
                </div>
            </div>
        </form>
    );
};