
import { createSlice } from '@reduxjs/toolkit';
import {fetchReviews} from "@/src/store/thunks/RewiewThunk";
import {RootState} from "@/src/store/store";


interface Review {
    id: number;
    text: string;
}

interface ReviewsState {
    items: Review[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewsState = {
    items: [],
    loading: false,
    error: null,
};

export const selectReviewItems = (state: RootState) => state.reviews.items;
export const selectLoadingReview = (state: RootState) => state.reviews.loading;
export const selectReviewError = (state: RootState) => state.reviews.error;

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const reviewsReducer =  reviewsSlice.reducer;