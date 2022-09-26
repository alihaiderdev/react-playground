import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
  error: "",
  meta: {},
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  (url) => {
    return axios(url, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(({ data }) => {
        return { products: data.data, meta: data.meta.pagination };
      })
      .catch((error) => error.message);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { type, payload }) => {
      state.isLoading = false;
      state.products =
        state.products?.length > 0
          ? [...state.products, ...payload.products]
          : payload.products;
      state.meta = payload.meta;
    });
    builder.addCase(fetchProducts.rejected, (state, { type, payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default productSlice.reducer;
export const productActions = productSlice.actions;
