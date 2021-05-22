import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import styles from '../common/Styles';

export default function Nav({ onHamburgerPress }) {
  return (
    <View style={styles.navContainer}>
      <TouchableHighlight underlayColor="gray" onPress={onHamburgerPress} style={styles.navMenu}>
        <Icon name="menu" size={40} />
      </TouchableHighlight>
      <Text>Hello World</Text>
    </View>
  );
}

Nav.propTypes = {
  onHamburgerPress: PropTypes.func.isRequired
};
