'use client';
import { configureStore } from '@reduxjs/toolkit';
import {cartReducer} from "@/src/store/slices/CartSlice";
import {productsReducer} from "@/src/store/slices/ProductSlice";
import {reviewsReducer} from "@/src/store/slices/RewievsSlice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        reviews: reviewsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;