// TODO: use translation
// TODO: use API

import React, { useState, useRef, useContext } from 'react';
import { Button, View, Text, NavigatorIOS } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { t } from 'i18n-js';

import PinInput from './PinInput';
import AuthContext from './AuthContext';
import PinValidator from './PinValidator';

import { isValidPin } from '../../model/Auth';

import * as api from '../../model/Auth';

import styles from './styles';

export default function ChangePinScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { params: { pin: oldPin, mode = 'change' } = {} } = route;

  const [newPin, setNewPin] = useState('');
  const [repeatPin, setRepeatPin] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const newPinRef = useRef();
  const repeatPinRef = useRef();

  const clearForm = () => {
    setNewPin('');
    setRepeatPin('');
  };

  const showError = message => {
    setIsLoading(false);
    setError(message);
    clearForm();
  };

  const handleNewPinSubmit = () => {
    repeatPinRef.current.focus();
  };

  const handleRepeatPinSubmit = async () => {
    if (newPin !== repeatPin) {
      showError('Введённые пин-коды не совпадают');
      return;
    }
    setIsLoading(true);
    setError('');
    const token = await api.changePin(oldPin, newPin);
    if (!token) {
      showError('Ошибка при смене пин-кода.');
      return;
    }
    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <Text>{error}</Text>
      <PinInput
        ref={newPinRef}
        title="Новый пин-код"
        autoFocus={true}
        returnKeyType="next"
        value={newPin}
        hasError={error !== ''}
        onChangeText={setNewPin}
        onSubmitEditing={handleNewPinSubmit}
      />
      <PinInput
        ref={repeatPinRef}
        title="Новый пин-код повторно"
        value={repeatPin}
        hasError={error !== ''}
        onChangeText={setRepeatPin}
        onSubmitEditing={handleRepeatPinSubmit}
      />
      <Button onPress={handleRepeatPinSubmit} title="OK" />
      <Button onPress={() => {}} title="Отмена" />
    </View>
  );
}
