import { t } from 'i18n-js';
import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { selectProtection } from '../protection/protectionSlice';
import ChangePin from '../protection/ChangePin';
import RemovePin from '../protection/RemovePin';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
});

export default function SettingsScreen() {
  const { isProtected } = useSelector(selectProtection);
  return (
    <ScrollView style={styles.screen}>
      <Text>{t('PIN Code')}</Text>
      <ChangePin />
      {isProtected ? <RemovePin /> : null}
    </ScrollView>
  );
}
