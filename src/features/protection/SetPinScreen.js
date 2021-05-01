import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import PinConsole from './PinConsole';
import { changePin } from './protectionSlice';
import { protection as api } from '../../api';

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default function SetPinScreen({
  navigation: { navigate },
  route: { params }
}) {
  const dispatch = useDispatch();

  const [oldPin, setOldPin] = useState(params.oldPin);
  const [oldPinValid, setOldPinValid] = useState(false);
  const [newPin, setNewPin] = useState(params.newPin);
  const [verifyPin, setVerifyPin] = useState(params.newPin);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateOldPin = async () => {
    setLoading(true);
    setErrorMessage('');
    if (await api.checkPin(oldPin)) {
      setOldPinValid(true);
      setLoading(false);
      return;
    }
    setOldPin(undefined);
    setLoading(false);
    setErrorMessage(t('#wrong-pin-error'));
  };

  const onPinVerificationError = () => {
    setNewPin(undefined);
    setVerifyPin(undefined);
    setLoading(false);
    setErrorMessage(t('#new-pin-not-match-error'));
  };

  const execChangePin = async () => {
    setLoading(true);
    await dispatch(changePin({ oldPin, newPin }));

    // TODO: need reset state?
    // setOldPin(undefined);
    // setOldPinValid(false);
    // setNewPin(undefined);
    // setVerifyPin(false);
    // setLoading(false);
    // setErrorMessage('');

    navigate('main');
  };

  useEffect(() => {
    if (oldPin === undefined) {
      return;
    }
    if (!oldPinValid) {
      validateOldPin();
      return;
    }
    if (newPin === undefined || verifyPin === undefined) {
      return;
    }
    if (newPin !== verifyPin) {
      onPinVerificationError();
      return;
    }
    execChangePin();
  });

  const onPinEntered = (pin, reset) => {
    reset();
    if (oldPin === undefined) {
      setOldPin(pin);
      return;
    }
    if (newPin === undefined) {
      setNewPin(pin);
      return;
    }
    if (verifyPin === undefined) {
      setVerifyPin(pin);
    }
  };

  let message = t('#reenter-new-pin-message');
  if (newPin === undefined) message = t('#enter-new-pin-message');
  if (oldPin === undefined) message = t('#enter-pin-message');
  if (isLoading) message = '';

  return (
    <View style={styles.screen}>
      <PinConsole
        message={message}
        isLoading={isLoading}
        error={errorMessage}
        pinLength={4}
        onPinEntered={onPinEntered}
      />
    </View>
  );
}

SetPinScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      oldPin: PropTypes.string,
      newPin: PropTypes.string,
    })
  }).isRequired
};
