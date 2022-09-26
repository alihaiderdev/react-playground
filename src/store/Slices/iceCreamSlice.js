import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numOfIcecreams: 10,
};

const iceCreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIcecreams--;
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(cakeActions.ordered, (state) => {
  //       state.numOfIcecreams--;
  //     });
  //   },
  // extraReducers: {
  //   ['cake/ordered']: state => {
  //     state.numOfIcecreams--
  //   }
  // }
});

export default iceCreamSlice.reducer;
export const iceCreamActions = iceCreamSlice.actions;
