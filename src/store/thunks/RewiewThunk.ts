import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://o-complex.com:1337/reviews');
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Не удалось загрузить отзывы');
        }
    }
);