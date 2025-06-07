import {fetchProducts} from "@/src/store/thunks/ProductThunk";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/src/store/store";

interface ProductsState {
    items: Product[];
    page: number;
    hasMore: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
};

export const selectProductItems = (state: RootState) => state.products.items;
export const selectHasMoreProducts = (state: RootState) => state.products.hasMore;
export const selectLoadingProducts = (state: RootState) => state.products.loading;
export const selectProductsPage = (state: RootState) => state.products.page;

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.items = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ApiProductResponse>) => {
                state.loading = false;
                state.items = [...state.items, ...action.payload.items];
                state.hasMore = action.payload.items.length > 0;
                state.page = state.page + 1;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;