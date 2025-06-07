'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {addToCart, removeFromCart, updateQuantity} from "@/src/store/slices/CartSlice";

interface Product {
    id: number;
    title: string;
    price: number;
    image_url?: string;
    description?: string;
}

export const BuyButton = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [localQuantity, setLocalQuantity] = useState(1);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const currentItem = cartItems.find(item => item.id === product.id);

    useEffect(() => {
        if (currentItem) {
            setLocalQuantity(currentItem.quantity);
        } else {
            setLocalQuantity(1);
        }
    }, [currentItem]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            setLocalQuantity(newQuantity);
            if (currentItem) {
                dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
            }
        }
    };

    const handleBlur = () => {
        setIsInputFocused(false);
        if (localQuantity < 1) {
            const validQuantity = 1;
            setLocalQuantity(validQuantity);
            if (currentItem) {
                dispatch(updateQuantity({ id: product.id, quantity: validQuantity }));
            }
        }
    };

    const incrementQuantity = () => {
        const newQuantity = (currentItem?.quantity || 0) + 1;
        if (currentItem) {
            dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
        } else {
            dispatch(addToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                quantity: newQuantity
            }));
        }
    };

    const decrementQuantity = () => {
        if (!currentItem) return;

        if (currentItem.quantity === 1) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(updateQuantity({
                id: product.id,
                quantity: currentItem.quantity - 1
            }));
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.title,
            price: product.price,
            quantity: localQuantity
        }));
    };

    return currentItem ? (
        <div className="d-flex align-items-center justify-content-center" style={{ gap: '0.5rem' }}>
            <button
                className="btn btn-outline-danger"
                onClick={decrementQuantity}
                aria-label="Уменьшить количество"
            >
                -
            </button>
            <input
                type="number"
                min="1"
                value={isInputFocused ? localQuantity : currentItem.quantity}
                onChange={handleQuantityChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={handleBlur}
                className="form-control text-center"
                style={{ width: '60px' }}
                aria-label="Количество товара"
            />
            <button
                className="btn btn-outline-success"
                onClick={incrementQuantity}
                aria-label="Увеличить количество"
            >
                +
            </button>
        </div>
    ) : (
        <button
            className="btn btn-secondary w-100"
            onClick={handleAddToCart}
            aria-label={`Добавить ${product.title} в корзину`}
        >
            Купить
        </button>
    );
};