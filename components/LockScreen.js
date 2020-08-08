// Android specific component
// use android specific PinConsole

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import i18n from 'i18n-js';

import {
  STATUS_BUSY,
  STATUS_ERROR,
  STATUS_IDLE,
  PinConsole
} from './PinConsole';

import { pinLength } from '../auth/Settings';

import AuthenticateContext from './AuthenticateContext';

function getStatus({ inProgress, error }) {
  if (error) {
    return STATUS_ERROR;
  }
  if (inProgress) {
    return STATUS_BUSY;
  }
  return STATUS_IDLE;
}

export default function LockScreen({ route }) {
  const lock = route.params;
  const {
    error,
    inProgress,
    token,
    signIn,
    signOut
  } = useContext(AuthenticateContext);

  if (lock) {
    useFocusEffect(() => {
      signOut(token);
      return () => { };
    });
    return null;
  }

  return (
    <PinConsole
      message={error !== null ? error.message : i18n.t('Enter pin:')}
      status={getStatus({ error, inProgress })}
      digitsCount={pinLength}
      onPinEntered={(pin, reset) => {
        reset();
        signIn(pin);
      }}
    />
  );
}

LockScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      lock: PropTypes.bool
    })
  })
};

LockScreen.defaultProps = {
  route: {
    params: {
      lock: false
    }
  }
};
