import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Nav from '../../app/Nav';

import { signOut } from '../protection/protectionSlice';

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});

export default function MainScreen({ navigation: { openDrawer } }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.mainScreen}>
      <Nav onHamburgerPress={() => openDrawer()} />
      <Text>Hello World!</Text>
      <Button
        title="sign out"
        onPress={() => {
          dispatch(signOut());
        }}
      />
    </View>
  );
}

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
