import React from 'react';
import { View, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { t } from 'i18n-js';
import { verifyToken } from '../../model/Auth';
import PinValidator from './PinValidator';
import styles from './styles';

export default function withPinValidation(WrappedScreen) {
  function Wrapper(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params || {};
    const message = params.requestPinMessage || t('Enter PIN code');
    const isAuthorized = verifyToken(params.token);

    const handleValidationPassed = ({ pin, token }) => {
      navigation.setParams({ pin, token });
    };

    if (!isAuthorized) {
      return (
        <View style={styles.screen}>
          <Text>{message}</Text>
          <PinValidator autoFocus={true} onPassed={handleValidationPassed} />
        </View>
      );
    }

    return <WrappedScreen {...props} />;
  }

  Wrapper.displayName =
    WrappedScreen.displayName || WrappedScreen.name || 'Component';

  return Wrapper;
}
