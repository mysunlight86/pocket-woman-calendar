import { configureStore } from '@reduxjs/toolkit';
import protectionReducer from '../features/protection/protectionSlice';
import recordsReducer from '../features/records/recordsSlice';
import calendarReducer from '../features/calendar/calendarSlice';

export default configureStore({
  reducer: {
    protection: protectionReducer,
    records: recordsReducer,
    calendar: calendarReducer,
  },
});
