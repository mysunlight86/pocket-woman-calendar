import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import PinKey from './PinKey';
import GridLayout from './GridLayout';

/* eslint-disable react/no-array-index-key */
// Use buttonCodes indexes as keys. Codes will not be sorted or changed in runtime.

const buttonCodes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', 'C'];

export default function PinKeyboard({
  onPress,
  style
}) {
  const {
    innerBorder,
    outerBorder,
    padding,
    ...restStyle
  } = StyleSheet.flatten(style);
  return (
    <GridLayout
      rows={4}
      columns={3}
      innerBorder={innerBorder || 0}
      outerBorder={outerBorder || 0}
      padding={padding || 0}
      style={restStyle}
    >
      {
        buttonCodes.map((label, index) => gridProps => (
          label === null
            ? <View key={index} {...gridProps} />
            : (
              <PinKey
                key={index}
                label={label}
                onPress={onPress}
                {...gridProps}
              />
            )
        ))
      }
    </GridLayout>
  );
}

function checkStyles(props, propName, componentName) {
  const { [propName]: propValue } = props;
  const flatten = StyleSheet.flatten(propValue);
  if (!Number.isFinite(flatten.width)) {
    return new Error(`Prop ${propName} supplied to ${componentName} should contain finite width.`);
  }
  if (!Number.isFinite(flatten.height)) {
    return new Error(`Prop ${propName} supplied to ${componentName} should contain finite height.`);
  }
  return null;
}

PinKeyboard.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: checkStyles
};

PinKeyboard.defaultProps = {
  style: {}
};
