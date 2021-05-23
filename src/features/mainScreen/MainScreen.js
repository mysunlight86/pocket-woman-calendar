import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

import Nav from './Nav';
import { name as appName } from '../../../app.json';

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
      <Nav onHamburgerPress={() => openDrawer()} title={appName} />
      <Text>Hello World!</Text>
    </View>
  );
}

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
