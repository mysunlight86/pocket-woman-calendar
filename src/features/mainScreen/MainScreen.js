import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Nav from './Nav';
import { displayName } from '../../../app.json';
import Calendar from '../calendar/Calendar';

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});

export default function MainScreen({ navigation: { openDrawer } }) {
  return (
    <View style={styles.mainScreen}>
      <Nav onHamburgerPress={() => openDrawer()} title={displayName} />
      <Calendar />
    </View>
  );
}

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
