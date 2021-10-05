// TODO: use translation
// TODO: use API

import React, { useState, useRef } from 'react';
import { Button, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/core';

import styles from '../../common/styles';

import PinInput from './PinInput';

export default function ChangePinScreen() {
  const route = useRoute();
  const { params: { pin, token } = {} } = route;

  const [newPin, setNewPin] = useState('');
  const [repeatPin, setRepeatPin] = useState('');

  const newPinRef = useRef();
  const repeatPinRef = useRef();

  const handleNewPinSubmit = () => {
    repeatPinRef.current.focus();
  };

  return (
    <View style={styles.screen}>
      <Text>
        Text {pin} {token}
      </Text>
      <PinInput
        ref={newPinRef}
        title="Новый пин-код"
        autoFocus={true}
        returnKeyType="next"
        value={newPin}
        hasError={false}
        onChangeText={setNewPin}
        onSubmitEditing={handleNewPinSubmit}
      />
      <PinInput
        ref={repeatPinRef}
        title="Новый пин-код повторно"
        value={repeatPin}
        hasError={false}
        onChangeText={setRepeatPin}
        onSubmitEditing={() => {}}
      />
      <Button onPress={() => {}} title="OK" />
      <Button onPress={() => {}} title="Отмена" />
    </View>
  );
}
