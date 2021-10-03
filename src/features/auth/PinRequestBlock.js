import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Text, ViewPropTypes } from 'react-native';
import PinInput from './PinInput';

import { getToken } from '../../model/Auth';

export default function PinRequestScreen({ message, onPinEntered, style }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const pin = '';
      const token = await getToken(pin);
      if (token) {
        onPinEntered(pin, token);
        return;
      }
      setLoading(false);
    })();
  });

  const handleSubmit = async ({ nativeEvent: { text: pin } }) => {
    setLoading(true);
    const token = await getToken(pin);
    if (token) {
      onPinEntered(pin, token);
      return;
    }
    setLoading(false);
  };

  return (
    <View style={style}>
      <Text>{message}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <PinInput autoFocus={true} onSubmitEditing={handleSubmit} />
      )}
    </View>
  );
}

PinRequestScreen.propTypes = {
  message: PropTypes.string,
  onPinEntered: PropTypes.func,
  style: ViewPropTypes.style,
};

PinRequestScreen.defaultProps = {
  message: '',
  onPinEntered: () => {},
  style: {},
};
