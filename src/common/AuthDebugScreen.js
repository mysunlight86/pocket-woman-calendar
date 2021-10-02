import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import * as API from '../model/Auth';

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

  return (
    <View style={styles.screen}>
      <Text>Debug Auth Status</Text>
      <Text>{`isLoading: ${isLoading}`}</Text>
      <Text>{`isProtected: ${isProtected}`}</Text>
      <Text>{`token: ${token}`}</Text>
      <Text>{`is token valid: ${isValidToken}`}</Text>
    </View>
  );
}
