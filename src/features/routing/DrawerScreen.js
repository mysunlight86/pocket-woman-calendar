import { t } from 'i18n-js';
import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  block: {
    display: 'flex',
    alignItems: 'stretch',
    marginVertical: 10,
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 25,
  },
});

export default function DrawerScreen({ navigation }) {
  const isProtected = true;
  return (
    <View style={styles.drawer}>
      <View style={styles.block}>
        <Text>Hello World!</Text>
      </View>

      <View style={styles.block}>
        <TouchableHighlight
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('settings');
          }}
          underlayColor="gray"
          style={styles.menuItem}>
          <Text>{t('Settings')}</Text>
        </TouchableHighlight>

        {isProtected ? (
          <TouchableHighlight
            onPress={() => {
              navigation.closeDrawer();
            }}
            underlayColor="gray"
            style={styles.menuItem}>
            <Text>{t('Sign Out')}</Text>
          </TouchableHighlight>
        ) : null}
      </View>
    </View>
  );
}

DrawerScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
