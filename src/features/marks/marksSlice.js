import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const marksAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const marksSlice = createSlice({
  name: 'marks',
  initialState: marksAdapter.getInitialState(),
  reducers: {
    markAdded: marksAdapter.addOne,
    markRemoved: marksAdapter.removeOne,
  },
});

export const { markAdded, markRemoved } = marksSlice.actions;

export const marksSelectors = marksAdapter.getSelectors(state => state.marks);

export default marksSlice.reducer;
