import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  products: [],
  error: '',
  meta: {},
  productsInCart: [],
  isLoadingCart: false,
  errorCart: '',
  searchProducts: [],
  searchMeta: {},
  searchLoading: false,
  searchError: '',
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  (url) => {
    return axios(url)
      .then(({ data }) => {
        return { products: data.data, meta: data.meta.pagination };
      })
      .catch((error) => error.message);
  }
);
export const fetchSearchProducts = createAsyncThunk(
  'product/fetchSearchProducts',
  (url) => {
    return axios(url)
      .then(({ data }) => {
        return { products: data.data, meta: data.meta.pagination };
      })
      .catch((error) => error.message);
  }
);

export const fetchCartProductsList = createAsyncThunk(
  'product/fetchCartProductsList',
  (url) => {
    return axios(url)
      .then(({ data }) => data.data)
      .catch((error) => error.message);
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { type, payload }) => {
      state.isLoading = false;
      state.products = payload.products;
      state.meta = payload.meta;
    });
    builder.addCase(fetchProducts.rejected, (state, { type, payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(fetchCartProductsList.pending, (state) => {
      state.isLoadingCart = true;
    });
    builder.addCase(
      fetchCartProductsList.fulfilled,
      (state, { type, payload }) => {
        state.isLoadingCart = false;
        state.productsInCart = payload;
      }
    );
    builder.addCase(
      fetchCartProductsList.rejected,
      (state, { type, payload }) => {
        state.isLoadingCart = false;
        state.errorCart = payload;
      }
    );
    builder.addCase(fetchSearchProducts.pending, (state) => {
      state.searchLoading = true;
    });
    builder.addCase(
      fetchSearchProducts.fulfilled,
      (state, { type, payload }) => {
        state.searchLoading = false;
        state.searchProducts = payload.products;
        state.searchMeta = payload.meta;
      }
    );
    builder.addCase(
      fetchSearchProducts.rejected,
      (state, { type, payload }) => {
        state.searchLoading = false;
        state.searchError = payload;
      }
    );
  },
});

export default productSlice.reducer;
export const productActions = productSlice.actions;
