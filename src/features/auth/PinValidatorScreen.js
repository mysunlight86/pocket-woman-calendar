import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/core';

import { t } from 'i18n-js';

import PinValidator from './PinValidator';
import styles from './styles';

export default function PinValidatorScreen() {
  const route = useRoute();
  const params = route.params || {};
  const message = params.message || t('Enter PIN code');

  return (
    <View style={styles.screen}>
      <Text>{message}</Text>
      <PinValidator
        autoFocus={true}
        onPassed={params.onPassed}
        onFailed={params.onFailed}
      />
    </View>
  );
}
