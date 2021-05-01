import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import PinSettingsCard from '../protection/PinSettingsCard';

const styles = StyleSheet.create({
  scrollViewScreen: {
    flex: 1,
  }
});

export default function SettingsScreen({ navigation }) {
  return (
    <ScrollView style={styles.screen}>
      <PinSettingsCard navigation={navigation} />
    </ScrollView>
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired
};
