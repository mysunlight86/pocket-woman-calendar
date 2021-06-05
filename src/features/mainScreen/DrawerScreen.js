import { t } from 'i18n-js';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { displayName } from '../../../app.json';
import DrawerButton from './DrawerButton';
import SignOutButton from './SignOutButton';

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    display: 'flex',
  },
  header: {
    paddingHorizontal: 25,
  },
  block: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    marginVertical: 10,
  },
  footerBlock: {
    display: 'flex',
    alignItems: 'stretch',
    marginVertical: 10,
  },
});

export default function DrawerScreen({ navigation }) {
  const navigate = route => {
    navigation.closeDrawer();
    navigation.navigate(route);
  };

  return (
    <View style={styles.drawer}>
      <View style={styles.block}>
        <Text style={styles.header}>{displayName}</Text>
      </View>

      <View style={styles.footerBlock}>
        <DrawerButton
          caption={t('Settings')}
          onPress={() => navigate('settings')}
        />
        <SignOutButton />
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
