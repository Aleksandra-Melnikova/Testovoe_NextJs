import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await axios.get<ApiProductResponse>(
                `http://o-complex.com:1337/products?page=${page}&page_size=20`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);