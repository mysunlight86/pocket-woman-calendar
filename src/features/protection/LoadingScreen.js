import { t } from 'i18n-js';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { probe } from '../protection/protectionSlice';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function LoadingScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(probe());
  });
  return (
    <View style={styles.screen}>
      <Text>{t('Please Wait')}</Text>
    </View>
  );
}
