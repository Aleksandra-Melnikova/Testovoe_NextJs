'use client';

import {useSelector} from "react-redux";
import {RootState} from "@/src/store/store";


export const CartSummary = () => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price*item.quantity, 0);

    return (

            <div className="card-body">
                <h5 className="card-title">Корзина</h5>
                <div className="mb-3">
                    {cart.map(item => (
                        <div key={item.id} className="d-flex justify-content-between mb-2">
                            <div>
                                <span className="fw-medium">{item.name}</span>
                                <span className="text-muted ms-2">x{item.quantity}</span>
                            </div>
                            <div>
                                {(item.price*item.quantity).toLocaleString()} ₽
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
                        <span>{totalPrice.toLocaleString()} ₽</span>
                    </div>
                </div>
            </div>

    );
};