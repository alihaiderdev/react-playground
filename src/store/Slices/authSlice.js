import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

const success = (text) => {
  message.success(text);
};

const error = (text) => {
  message.error(text);
};

const initialState = {
  isLoading: false,
  user: {},
  error: "",
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  ({ url, userInfo }) => {
    return axios(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      data: JSON.stringify(userInfo),
    })
      .then(({ data }) => {
        return data;
      })
      .catch((error) => error.message);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = {};
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, { type, payload }) => {
      state.isLoading = false;
      console.log(payload);

      if (typeof payload !== "object") {
        error("Invalid identifier or password");
        return;
      }
      if ("jwt" in payload) {
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload));
        success("Successfully Login");
      }
    });
    // builder.addCase(fetchUser.rejected, (state, { type, payload }) => {
    //   state.isLoading = false;
    //   state.error = payload;
    //   error(payload);
    // });
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
