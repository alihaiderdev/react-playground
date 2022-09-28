import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orders: [],
  error: "",
};

export const fetchOrders = createAsyncThunk("order/fetchOrders", (url) => {
  // `/api/users/${user?.user.id}?populate=orders.products, orders.products.image, shippingAddress, shippingAddress.profile, billingAddress, billingAddress.profile`
  return axios(url)
    .then(({ data }) => {
      return data?.orders;
    })
    .catch((error) => error.message);
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, { type, payload }) => {
      state.isLoading = false;
      state.orders = payload;
    });
    builder.addCase(fetchOrders.rejected, (state, { type, payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default orderSlice.reducer;
export const orderActions = orderSlice.actions;
