import i18n from 'i18n-js';

import React from 'react';

import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  block: {
    display: 'flex',
    alignItems: 'stretch'
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 25
  }
});

export default function MainDrawer({ navigation }) {
  return (
    <View style={styles.drawer}>
      <View style={styles.block}>
        <Text>Hello World!</Text>
      </View>

      <View style={styles.block}>
        <TouchableHighlight
          onPress={() => navigation.navigate('settings')}
          underlayColor="gray"
          style={styles.menuItem}
        >
          <Text>{i18n.t('Settings')}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => navigation.navigate('about')}
          underlayColor="gray"
          style={styles.menuItem}
        >
          <Text>{i18n.t('About')}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

MainDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
