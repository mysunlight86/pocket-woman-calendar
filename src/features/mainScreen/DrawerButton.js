import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 25,
  },
});

export default function DrawerButton({ onPress, caption }) {
  return (
    <TouchableHighlight
      style={styles.menuItem}
      onPress={onPress}
      underlayColor="gray">
      <Text>{caption}</Text>
    </TouchableHighlight>
  );
}

DrawerButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
};
