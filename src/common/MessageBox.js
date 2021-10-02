import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import styles from './styles';

export default function MessageBox() {
  const { params: { message = '', buttonTitle = 'OK' } = {} } = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Text>{message}</Text>
      <Button title={buttonTitle} onPress={() => navigation.goBack()} />
    </View>
  );
}
