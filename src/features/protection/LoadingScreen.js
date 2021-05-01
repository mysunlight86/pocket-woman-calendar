import { t } from 'i18n-js';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { signIn } from '../protection/protectionSlice';

import Styles from '../../Styles';

export default function LoadingScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signIn({ pin: null }));
  });
  return (
    <View style={Styles.screen}>
      <Text>{t('Please Wait')}</Text>
    </View>
  );
}
