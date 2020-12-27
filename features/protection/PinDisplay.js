import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import { PropTypes } from 'prop-types';
import PinDigit from './PinDigit';

const padding = 5;
const minDigitSize = 10;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  digit: {
    padding
  }
});

function getMaxDigits(contWidth) {
  return Math.floor(contWidth / minDigitSize);
}

function getDigitSize(contWidth, contHeight, digitsCount) {
  const vertical = Math.max(contHeight - padding * 2, minDigitSize);
  const horizontal = Math.max(Math.floor(contWidth / digitsCount) - padding * 2, minDigitSize);
  return Math.min(vertical, horizontal);
}

export default function PinDisplay({ digits, style, dialledDigits }) {
  const finiteVal = val => (Number.isFinite(val) ? val : 0);
  const { width, height } = StyleSheet.flatten(style);
  const visibleDigits = finiteVal(digits) < 0
    ? 0
    : Math.min(getMaxDigits(width), finiteVal(digits));
  const digitSize = visibleDigits > 0
    ? getDigitSize(width, height, visibleDigits)
    : 0;
  return (
    <View style={[styles.screen, style]}>
      {
        Array.from(
          { length: visibleDigits },
          (el, index) => (
            <PinDigit
              key={index}
              dialled={index >= (visibleDigits - Math.max(dialledDigits, 0))}
              size={digitSize}
              style={styles.digit}
            />
          )
        )
      }
    </View>
  );
}

PinDisplay.propTypes = {
  digits: PropTypes.number,
  dialledDigits: PropTypes.number,
  style: ViewPropTypes.style
};

PinDisplay.defaultProps = {
  digits: 0,
  dialledDigits: 0,
  style: undefined,
};
