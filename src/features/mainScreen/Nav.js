import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 40,
  },

  hamburgerButton: {
    height: 40,
    justifyContent: 'center',
    padding: 5,
  },
});

export default function Nav({ onHamburgerPress, title }) {
  return (
    <View style={styles.navContainer}>
      <TouchableHighlight
        style={styles.hamburgerButton}
        underlayColor="gray"
        onPress={onHamburgerPress}>
        <Icon name="menu" size={30} />
      </TouchableHighlight>
      <Text>{title}</Text>
    </View>
  );
}

Nav.propTypes = {
  onHamburgerPress: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Nav.defaultProps = {
  title: 'Hello World!',
};
