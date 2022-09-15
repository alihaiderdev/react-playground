import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios('https://api.github.com/users?since=0&per_page=100', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then(({ data }) => data)
    .catch((error) => error.message);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
