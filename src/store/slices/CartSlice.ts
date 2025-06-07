'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {submitOrder} from "@/src/store/thunks/CartThunk";
import { RootState } from '../store';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}
const loadCartFromLocalStorage = (): CartItem[] => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch {
        return [];
    }
};

interface CartState {
    items: CartItem[] ;
    submitLoading: boolean;
    submitError: string | null,
    submitSuccess: boolean,
}

const initialState: CartState = {
    items: loadCartFromLocalStorage(),
    submitLoading: false,
    submitError: null,
    submitSuccess: false,
};

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectLoadingSubmit = (state: RootState) => state.cart.submitLoading;
export const selectSubmitError = (state: RootState) => state.cart.submitError;

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.submitLoading = true;
                state.submitError = null;
                state.submitSuccess = false;
            })
            .addCase(submitOrder.fulfilled, (state) => {
                state.submitLoading = false;
                state.submitSuccess = true;
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.submitLoading = false;
                state.submitError = action.payload as string;
            });
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;