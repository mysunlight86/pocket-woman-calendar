import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',

  initialState: { marks: [] },

  reducers: {
    addRecord: (state, { payload }) => {
      state.marks.push(payload);
    },
  },
});

export const selectMarks = state => state.calendar.marks;

export const { addRecord } = calendarSlice.actions;

export default calendarSlice.reducer;
