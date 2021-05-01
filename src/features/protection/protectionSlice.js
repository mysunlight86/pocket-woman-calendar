import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { protection as api } from '../../api';

export const selectProtection = state => state.protection;

export const signIn = createAsyncThunk(
  'protection/singIn',
  async ({ pin }) => ({
    token: await api.getToken(pin),
    pin,
  })
);

export const signOut = createAsyncThunk(
  'protection/singOut',
  (args, { getState }) => {
    const { token } = selectProtection(getState());
    api.discard(token);
  }
);

export const changePin = createAsyncThunk(
  'protection/changePin',
  async ({ oldPin, newPin }) => ({
    token: await api.changePin(oldPin, newPin),
    pin: newPin,
  })
);

export const protectionSlice = createSlice({
  name: 'protection',

  initialState: {
    token: null,
    error: null,
    isLoading: true,
  },

  reducers: {},

  extraReducers: {
    [signIn.pending]: state => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, { payload: { token, pin } }) => {
      state.token = token;
      state.error = null;
      state.isLoading = false;
      if (!token && pin !== null) state.error = 'Invalid PIN';
    },
    [signIn.rejected]: (state, { error }) => {
      state.token = null;
      state.isLoading = false;
      state.error = null;
      if (error && error.message !== 'Rejected') state.error = error.message;
    },

    [signOut.fulfilled]: state => {
      state.token = null;
      state.error = null;
      state.isLoading = false;
    },

    [changePin.pending]: state => {
      state.isLoading = true;
    },
    [changePin.fulfilled]: (state, { payload: { token, pin } }) => {
      state.error = null;
      state.isLoading = false;
      if (token !== null) state.error = 'Invalid PIN code';
    },
    [changePin.rejected]: (state, { error }) => {
      state.token = null;
      state.isLoading = false;
      if (error) state.error = error.message;
    },
  },
});

export default protectionSlice.reducer;
