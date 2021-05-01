import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { t } from 'i18n-js';

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

export default function DrawerScreen({ navigation: { navigate, closeDrawer } }) {
  const onItemClick = route => {
    closeDrawer();
    navigate(route);
  };
  return (
    <View style={styles.drawer}>
      <View style={styles.block}>
        <Text>Hello World!</Text>
      </View>

      <View style={styles.block}>
        <TouchableHighlight
          onPress={() => onItemClick('settings')}
          underlayColor="gray"
          style={styles.menuItem}
        >
          <Text>{t('#settings-screen')}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

DrawerScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired
  }).isRequired
};
