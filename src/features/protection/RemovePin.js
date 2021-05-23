import { t } from 'i18n-js';
import React, { useState, useRef } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import PinInput from './PinInput';
import { selectIsBusy, changePin } from './protectionSlice';

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
});

export default function ChangePin() {
  const dispatch = useDispatch();
  const isBusy = useSelector(selectIsBusy);

  const oldPinRef = useRef(null);

  const [pin, setPin] = useState(null);
  const [isPinValid, setPinValid] = useState(true);

  const resetFormStatus = () => {
    setPinValid(true);
  };

  const clearForm = () => {
    if (oldPinRef.current) oldPinRef.current.clear();
  };

  const handleSubmit = async () => {
    resetFormStatus();
    const { success } = unwrapResult(
      await dispatch(changePin({ oldPin: pin, newPin: null }))
    );
    if (!success) {
      setPinValid(false);
      return;
    }
    clearForm();
  };

  return (
    <View>
      <PinInput
        ref={oldPinRef}
        title={t('Enter PIN code:')}
        hasError={!isPinValid}
        editable={!isBusy}
        onChangeText={setPin}
      />
      <View style={styles.buttonsRow}>
        <Button title={t('Remove')} disabled={isBusy} onPress={handleSubmit} />
      </View>
    </View>
  );
}
