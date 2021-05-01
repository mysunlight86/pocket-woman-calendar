import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { t } from 'i18n-js';
import styles from '../../app/Styles';
import { selectProtection } from './protectionSlice';

export default function PinSettingsCard({ navigation: { navigate } }) {
  const { isProtected } = useSelector(selectProtection);

  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>{t('#settings-security-header')}</Text>
      <Text style={styles.cardText}>{t('#settings-security-text')}</Text>
      <View style={styles.cardButtons}>
        {isProtected ? (
          <>
            <View style={styles.cardButton}>
              <Button
                title={t('#settings-remove-pin')}
                onPress={() => navigate('set-pin', { newPin: null })}
              />
            </View>
            <View style={styles.cardButton}>
              <Button
                title={t('#settings-change-pin')}
                onPress={() => navigate('set-pin', {})}
              />
            </View>
          </>
        ) : (
          <View style={styles.cardButton}>
            <Button
              title={t('#settings-set-pin')}
              onPress={() => navigate('set-pin', { oldPin: null })}
            />
          </View>
        )}
      </View>
    </View>
  );
}

PinSettingsCard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
