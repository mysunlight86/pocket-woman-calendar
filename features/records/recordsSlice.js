import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { protectedStorage as api } from '../../api';
import { selectProtection } from '../protection/protectionSlice';

const initialState = {
  isLoaded: false,
  records: [],
  error: null,
};

export const selectIsLoaded = state => state.records.isLoaded;
export const selectRecords = state => state.records.records;

export const load = createAsyncThunk('records/load', async (arg, { dispatch, getState }) => {
  const { token } = selectProtection(getState());
  const rawData = await api.get({ token, key: 'records' });
  dispatch({
    type: 'records/added',
    payload: rawData ? JSON.parse(rawData) : []
  });
});

const reducers = {
  loaded(state, { payload }) {
    state.records = payload;
    state.isLoaded = true;
  },

  added(state, { payload }) {
    state.records.push(...payload);
  },

  removed(state, { payload }) {
    state.records = state.records.filter(record => !payload.includes(record));
  },

  saveError(state, { error }) {
    state.error = error;
  }
};

const extraReducers = {
  [load.fulfilled]: state => {
    state.error = null;
    state.isLoaded = true;
  },
  [load.rejected]: (state, { error }) => {
    state.error = error;
    state.isLoaded = false;
  }
};

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers,
  extraReducers
});

const saveRecords = ({ token, records }) => api.set({ token, key: 'records', value: JSON.stringify(records) });

const saveRecordsDebounced = _.debounce(async (request, onError) => {
  try {
    await saveRecords(request);
  } catch (error) {
    onError(error);
  }
});

export const save = (immediately = false) => (dispatch, getState) => {
  const state = getState();
  const { token } = selectProtection(state);
  const records = selectRecords(state);
  saveRecordsDebounced(
    { token, records },
    error => dispatch({ type: 'records/saveError', error })
  );
  if (immediately) {
    saveRecordsDebounced.flush();
  }
};

const { added, removed } = recordsSlice.actions;

export const add = records => dispatch => {
  dispatch(added(records));
  dispatch(save());
};

export const remove = records => dispatch => {
  dispatch(removed(records));
  dispatch(save());
};

export default recordsSlice.reducer;
