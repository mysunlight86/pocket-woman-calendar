import { t } from 'i18n-js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as security from '../../api/security';

const initialState = {
  isLoaded: false,
  isBusy: true,
  isProtected: false,
  token: null,
  error: null,
};

export const selectProtection = state => state.protection;

export const probe = createAsyncThunk('protection/probe', async () => ({
  token: await security.getToken(null),
}));

export const signIn = createAsyncThunk(
  'protection/singIn',
  async ({ pin }) => ({
    token: await security.getToken(pin),
  })
);

export const changePin = createAsyncThunk(
  'protection/changePin',
  async ({ oldPin, newPin }) => ({
    success: await security.changePin(oldPin, newPin),
  })
);

function handlePending(state) {
  state.isBusy = true;
}

function handleRejection(state, { error }) {
  state.isBusy = false;
  state.error = error && error.message;
}

export const protectionSlice = createSlice({
  name: 'protection',
  initialState,

  reducers: {
    signOut: state => {
      state.isBusy = false;
      state.token = null;
      state.error = null;
    },
  },

  extraReducers: {
    [probe.fulfilled]: (state, { payload }) => {
      state.isLoaded = true;
      state.isBusy = false;
      state.isProtected = payload.token === null;
      state.token = payload.token;
      state.error = null;
    },

    [signIn.pending]: handlePending,
    [signIn.rejected]: handleRejection,
    [signIn.fulfilled]: (state, { payload }) => {
      state.isBusy = false;
      state.token = payload.token;
      state.error = !payload.token ? t('Invalid PIN code') : null;
    },

    [changePin.pending]: handlePending,
    [changePin.rejected]: handleRejection,
    [changePin.fulfilled]: (state, { payload, meta }) => {
      state.isBusy = false;
      if (payload.success) state.isProtected = meta.arg.newPin !== null;
      state.error = !payload.success ? t('Invalid PIN code') : null;
    },
  },
});

export const { signOut } = protectionSlice.actions;

export default protectionSlice.reducer;
