import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import i18n from 'i18n-js';

const styles = StyleSheet.create({
  settingsScreen: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    alignItems: 'flex-start',
  },

  cardHeader: {
    fontSize: 28,
    marginBottom: 10
  },

  cardText: {
    marginBottom: 10
  },

  cardButtons: {
    alignSelf: 'flex-end',
    flexDirection: 'row'
  }
});

export default function SettingsScreen() {
  return (
    <View style={styles.settingsScreen}>
      <View style={styles.card}>
        <Text style={styles.cardHeader}>{i18n.t('#settings-security-header')}</Text>
        <Text style={styles.cardText}>{i18n.t('#settings-security-text')}</Text>
        <View style={styles.cardButtons}><Button title={i18n.t('#settings-security-change-pin-button')} /></View>
      </View>
    </View>
  );
}
