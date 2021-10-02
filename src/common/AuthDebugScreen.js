import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import * as API from '../model/Auth';

import PinInput from '../features/auth/PinInput';

import { useAuth } from '../features/auth/hooks';

export default function AuthDebugScreen() {
  const [isLoading, setLoading] = useState(true);
  const [isProtected, setProtected] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const _token = await API.getToken('');
      setLoading(false);
      setProtected(_token === null);
      setToken(_token);
    })();
  });

  const isValidToken = API.verifyToken(token);

  const [authState] = useAuth();

  return (
    <View style={styles.screen}>
      <Text>Debug Auth Status</Text>
      <Text>{`isLoading: ${isLoading}`}</Text>
      <Text>{`isProtected: ${isProtected}`}</Text>
      <Text>{`token: ${token}`}</Text>
      <Text>{`is token valid: ${isValidToken}`}</Text>
      <Text>{`STATE isProtected ${authState.isProtected}`}</Text>
      <Text>{`STATE token ${authState.token}`}</Text>
      <Text>{`STATE authorized ${authState.token !== null}`}</Text>
      <PinInput title="Debug PIN:" />
    </View>
  );
}
