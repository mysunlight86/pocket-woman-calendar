import { t } from 'i18n-js';
import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import PinInput from './PinInput';
import { signIn, selectIsBusy, selectProtectionError } from './protectionSlice';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function LockScreen() {
  const dispatch = useDispatch();
  const isBusy = useSelector(selectIsBusy);
  const error = useSelector(selectProtectionError);
  const pinInputRef = useRef(null);

  const getMessage = () => {
    if (isBusy) return t('Please Wait');
    if (error) return error;
    return t('Enter PIN code');
  };

  const handleSubmit = async pin => {
    await dispatch(signIn({ pin }));
    pinInputRef.current.clear();
  };

  return (
    <View style={styles.screen}>
      <Text>{getMessage()}</Text>
      <PinInput
        ref={pinInputRef}
        autoFocus={true}
        editable={!isBusy}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
