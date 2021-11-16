import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});
