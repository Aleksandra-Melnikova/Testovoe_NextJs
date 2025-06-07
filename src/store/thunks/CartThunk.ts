import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface OrderData {
    phone: string;
    cart: Array<{ id: number; quantity: number }>;
}

export const submitOrder = createAsyncThunk(
    'order/submit',
    async (orderData: OrderData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://o-complex.com:1337/order', orderData);
            if (response.data.success) {
                return response.data;
            } else {
                return rejectWithValue(response.data.error || 'Ошибка при оформлении заказа');
            }
        } catch (err) {
            return rejectWithValue('Ошибка при отправке заказа');
        }
    }
);