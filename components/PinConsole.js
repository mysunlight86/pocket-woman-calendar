/* Android specific component */

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

const Styles = StyleSheet.create({
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

export const STATUS_BUSY = 'busy';
export const STATUS_IDLE = 'idle';
export const STATUS_ERROR = 'error';

// TODO: Нужно ли перенести init в Render???

const {
  width: initWidth,
  height: initHeight
} = Dimensions.get('window');

export function PinConsole({
  message,
  status,
  digitsCount,
  onKeyPressed,
  onPinEntered,
  style
}) {
  if (digitsCount <= 0) {
    return null;
  }

  const [dimensions, setDimensions] = useState({ width: initWidth, height: initHeight });
  const onChangeDimensions = ({ window }) => {
    const { width, height } = window;
    setDimensions({ width, height });
  };
  const { width, height } = dimensions;

  useEffect(() => {
    Dimensions.addEventListener('change', onChangeDimensions);
    return () => {
      Dimensions.removeEventListener('change', onChangeDimensions);
    };
  });

  const [pin, setPin] = useState('');
  const isInteractive = status !== STATUS_BUSY && pin.length < digitsCount;

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
    if (pin.length + 1 === digitsCount) {
      onPinEntered(pin + code, () => { setPin(''); });
    }
  };

  return (
    <View style={[Styles.screen, style]}>
      <View style={Styles.frame}>
        {
          status === STATUS_BUSY
            ? <ProgressBar />
            : (
              <Text
                style={status === STATUS_ERROR ? Styles.warning : null}
              >
                {message}
              </Text>
            )
        }
      </View>

      <PinDisplay
        digits={digitsCount}
        dialledDigits={pin.length}
        style={[
          Styles.manual,
          Styles.display,
          {
            width: width / 2,
          }
        ]}
      />

      <PinKeyboard
        onPress={onButtonPress}
        style={[
          Styles.manual,
          Styles.keyboard,
          {
            width, height: Math.floor(height / 2),
          }
        ]}
      />
    </View>
  );
}

function checkDigitsCount(props, propName, componentName) {
  const { [propName]: propValue } = props;
  if (typeof propValue !== 'number') {
    return new Error(`Prop ${propName} supplied to ${componentName} should be a number.`);
  }
  if (!Number.isFinite(propValue)) {
    return new Error(`Prop ${propName} supplied to ${componentName} should finite.`);
  }
  if (propValue <= 0) {
    return new Error(`Prop ${propName} supplied to ${componentName} should be positive.`);
  }
  return null;
}

function checkStatus(props, propName, componentName) {
  const { [propName]: propValue } = props;
  if (propValue === undefined) {
    return null;
  }
  if (typeof propValue !== 'string') {
    return new Error(`Prop ${propName} supplied to ${componentName} should be a string.`);
  }
  if ([
    STATUS_BUSY,
    STATUS_IDLE,
    STATUS_ERROR,
  ].indexOf(propValue) === -1) {
    return new Error(`Prop ${propName} supplied to ${componentName} has unsupported value ${propValue}.`);
  }
  return null;
}

PinConsole.propTypes = {
  message: PropTypes.string,
  status: checkStatus,
  digitsCount: checkDigitsCount,
  onKeyPressed: PropTypes.func,
  onPinEntered: PropTypes.func,
  style: ViewPropTypes.style
};

function doNothing() { }

PinConsole.defaultProps = {
  message: '',
  status: STATUS_IDLE,
  digitsCount: 0,
  onKeyPressed: doNothing,
  onPinEntered: doNothing,
  style: {}
};
