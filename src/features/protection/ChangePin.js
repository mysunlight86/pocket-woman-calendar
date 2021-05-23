import { t } from 'i18n-js';
import React, { useState, useRef } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import PinInput from './PinInput';
import { changePin, selectIsBusy, selectIsProtected } from './protectionSlice';

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
});

const pinRx = /\d{4}/;

export default function ChangePin() {
  const dispatch = useDispatch();
  const isBusy = useSelector(selectIsBusy);
  const isProtected = useSelector(selectIsProtected);

  const oldPinRef = useRef(null);
  const newPinRef = useRef(null);
  const repeatPinRef = useRef(null);

  const [oldPin, setOldPin] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [repeatPin, setRepeatPin] = useState(null);

  const [isPinValid, setPinValid] = useState(true);
  const [isNewPinValid, setNewPinValid] = useState(true);

  const getSubmitButtonText = () => t(!isProtected ? 'Create' : 'Change');

  const resetFormStatus = () => {
    setPinValid(true);
    setNewPinValid(true);
  };

  const clearForm = () => {
    if (oldPinRef.current) oldPinRef.current.clear();
    if (newPinRef.current) newPinRef.current.clear();
    if (repeatPinRef.current) repeatPinRef.current.clear();
  };

  const isValidPin = pin => pinRx.test(pin);

  const handleSubmit = async () => {
    resetFormStatus();
    if (newPin !== repeatPin || !isValidPin(newPin)) {
      setNewPinValid(false);
      return;
    }
    const { success } = unwrapResult(
      await dispatch(changePin({ oldPin, newPin }))
    );
    if (!success) {
      setPinValid(false);
      return;
    }
    clearForm();
  };

  return (
    <View>
      {isProtected ? (
        <PinInput
          ref={oldPinRef}
          title={t('Enter PIN code:')}
          returnKeyType="next"
          hasError={!isPinValid}
          editable={!isBusy}
          onChangeText={setOldPin}
        />
      ) : null}
      <PinInput
        ref={newPinRef}
        title={t('Enter new PIN code:')}
        returnKeyType="next"
        editable={!isBusy}
        hasError={!isNewPinValid}
        onChangeText={setNewPin}
        onSubmit={() => {
          repeatPinRef.current.focus();
        }}
      />
      <PinInput
        title={t('Repeat new PIN code:')}
        ref={repeatPinRef}
        editable={!isBusy}
        hasError={!isNewPinValid}
        onChangeText={setRepeatPin}
        onSubmit={handleSubmit}
      />
      <View style={styles.buttonsRow}>
        <Button
          title={getSubmitButtonText()}
          disabled={isBusy}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}
