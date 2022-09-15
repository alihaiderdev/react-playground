import { configureStore } from '@reduxjs/toolkit';
// import reduxLogger from 'redux-logger';

// import cakeReducer from './Slices/cakeSlice';
// import iceCreamReducer from './Slices/iceCreamSlice';
// import questionsReducer from './Slices/questionsSlice';
import userReducer from './Slices/userSlice';

// const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    // cake: cakeReducer,
    // iceCream: iceCreamReducer,
    user: userReducer,
    // questions: questionsReducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
