import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { protection as api } from '../../api';

export const IDLE = 'idle';
export const LOADING = 'loading';
export const FAILED = 'failed';
export const SUCCESSFUL = 'successful';

const initialState = {
  token: null,
  isProtected: false,
  error: null,
  status: IDLE,
};

export const selectProtection = state => state.protection;

export const login = createAsyncThunk('protection/login', async (
  { pin },
  { rejectWithValue }
) => {
  const token = await api.getToken(pin);
  return !token
    ? rejectWithValue({ pin })
    : { token, pin };
});

export const changePin = createAsyncThunk('protection/changePin', async (
  { oldPin, newPin },
  { rejectWithValue }
) => {
  const token = await api.changePin(oldPin, newPin);
  return !token
    ? rejectWithValue({ pin: oldPin })
    : { token, pin: newPin };
});

export const protectionSlice = createSlice({
  name: 'protection',
  initialState,
  reducers: {
    tokenDiscarded(state) {
      state.token = null;
      state.status = IDLE;
      state.error = null;
    }
  },
  extraReducers: {
    [login.pending]: state => { state.status = LOADING; },
    [login.fulfilled]: (state, { payload: { token, pin } }) => {
      state.token = token;
      state.status = SUCCESSFUL;
      state.isProtected = pin !== null;
      state.error = null;
    },
    [login.rejected]: (state, { error, payload: { pin } }) => {
      state.token = null;
      state.status = pin ? FAILED : IDLE;
      state.isProtected = true;
      state.error = null;
      if (error && error.message !== 'Rejected') {
        state.error = error;
      }
    },

    [changePin.pending]: state => { state.status = LOADING; },
    [changePin.fulfilled]: (state, { payload: { token, pin } }) => {
      state.token = token;
      state.status = SUCCESSFUL;
      state.isProtected = pin !== null;
      state.error = null;
    },
    [changePin.rejected]: (state, { error }) => {
      state.token = null;
      state.status = FAILED;
      state.error = error;
    }
  }
});

export const { tokenDiscarded } = protectionSlice.actions;

export const logout = () => (dispatch, getState) => {
  const { token } = selectProtection(getState);
  api.discard(token);
  dispatch(tokenDiscarded());
};

export default protectionSlice.reducer;
