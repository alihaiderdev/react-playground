import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  questions: {},
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchQuestions = createAsyncThunk('user/fetchQuestions', () => {
  const token = '192|v1Y5XF85EaJfT1sWAbbwpJLhYdfaZFYVS39hiNnO';
  return axios('http://172.105.60.26/api/v1/questions', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then(({ data }) => {
      //   return data;
      const removed = 'prescription-and-lab-advice';
      const { [removed]: remove, ...rest } = data;
      return rest;
    })
    .catch((error) => error.message);
});

const questionsSlice = createSlice({
  name: 'question',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default questionsSlice.reducer;
export const questionsActions = questionsSlice.actions;
