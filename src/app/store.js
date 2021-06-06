import { configureStore } from '@reduxjs/toolkit';
import protectionReducer from '../features/protection/protectionSlice';
import marksReducer from '../features/marks/marksSlice';

export default configureStore({
  reducer: {
    protection: protectionReducer,
    marks: marksReducer,
  },
});
