import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
  Dimensions
} from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import PropTypes from 'prop-types';
import PinKeyboard from './PinKeyboard';
import PinDisplay from './PinDisplay';
import PinConsolePropTypes from './PinConsolePropTypes';

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  frame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  warning: {
    color: 'red'
  },
  manual: {
    flex: 0,
  },
  display: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    alignSelf: 'center',
    margin: 10
  },
  keyboard: {
    padding: 15
  }
});

export default function PinConsole({
  message,
  isLoading,
  error,
  pinLength,
  onKeyPressed,
  onPinEntered,
  style
}) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [pin, setPin] = useState('');

  useEffect(() => {
    const onChangeDimensions = ({ window }) => {
      setDimensions(window);
    };
    Dimensions.addEventListener('change', onChangeDimensions);
    return () => {
      Dimensions.removeEventListener('change', onChangeDimensions);
    };
  });

  const isInteractive = !isLoading && pin.length < pinLength;

  const onButtonPress = code => {
    if (!isInteractive) {
      return;
    }
    onKeyPressed(code);
    if (code === 'C') {
      setPin('');
      return;
    }
    setPin(pin + code);
    if (pin.length + 1 === pinLength) {
      onPinEntered(pin + code, () => { setPin(''); });
    }
  };

  const { width, height } = dimensions;

  return (
    <View style={[styles.screen, style]}>
      <View style={styles.frame}>
        <Text>{message}</Text>
        {isLoading ? <ProgressBar /> : null}
        {error ? <Text style={styles.warning}>{error}</Text> : null}
      </View>
      <PinDisplay
        digits={pinLength}
        dialledDigits={pin.length}
        style={[
          styles.manual,
          styles.display,
          {
            width: width / 2,
          }
        ]}
      />
      <PinKeyboard
        onPress={onButtonPress}
        style={[
          styles.manual,
          styles.keyboard,
          {
            width, height: Math.floor(height / 2),
          }
        ]}
      />
    </View>
  );
}

PinConsole.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  pinLength: PinConsolePropTypes.pinLength,
  onKeyPressed: PropTypes.func,
  onPinEntered: PropTypes.func,
  style: ViewPropTypes.style
};

PinConsole.defaultProps = {
  message: '',
  isLoading: false,
  error: null,
  pinLength: 0,
  onKeyPressed() {},
  onPinEntered() {},
  style: {}
};
