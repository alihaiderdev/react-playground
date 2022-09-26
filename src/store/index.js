import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
// import reduxLogger from 'redux-logger';
// import cakeReducer from './Slices/cakeSlice';
// import iceCreamReducer from './Slices/iceCreamSlice';
// import questionsReducer from './Slices/questionsSlice';
import productReducer from "./Slices/productSlice";
import userReducer from "./Slices/userSlice";

// const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    // cake: cakeReducer,
    // iceCream: iceCreamReducer,
    user: userReducer,
    product: productReducer,
    auth: authReducer,
    // questions: questionsReducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
