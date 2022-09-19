import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  users: [],
  error: '',
  total: 0,
};

const TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

export const fetchUsers = createAsyncThunk('user/fetchUsers', (query) => {
  return axios(
    query
      ? `https://api.github.com/search/users?q=${query}&per_page=100`
      : 'https://api.github.com/users?since=0&per_page=100',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  )
    .then(({ data }) => {
      console.log(data);
      return query ? [data?.items, data?.total_count] : [data, 0];
    })
    .catch((error) => error.message);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload[0];
      state.total = action.payload[1];
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
