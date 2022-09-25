import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  user: [],
  error: "",
};

export const fetchUser = createAsyncThunk("auth/fetchUser", (url) => {
  return axios(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(({ data }) => {
      return { products: data.data, meta: data.meta.pagination };
    })
    .catch((error) => error.message);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, { type, payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addCase(fetchUser.rejected, (state, { type, payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
