import React, { useEffect } from 'react';
import { t } from 'i18n-js';
import { useSelector, useDispatch } from 'react-redux';
import {
  login, selectProtection,
  IDLE, LOADING, FAILED
} from './protectionSlice';
import PinConsole from './PinConsole';

export default function LockScreen() {
  const { isProtected, error, status } = useSelector(selectProtection);
  const dispatch = useDispatch();

  let message = t('#enter-pin-message');
  if (status === FAILED) {
    message = t('#wrong-pin-error');
  }

  useEffect(() => {
    if (!isProtected && status === IDLE) {
      dispatch(login({ pin: null }));
    }
  });

  const onPinEntered = (pin, reset) => {
    reset();
    dispatch(login({ pin }));
  };

  return (
    <PinConsole
      message={message}
      isLoading={status === LOADING}
      error={error && error.message}
      pinLength={4}
      onPinEntered={onPinEntered}
    />
  );
}
