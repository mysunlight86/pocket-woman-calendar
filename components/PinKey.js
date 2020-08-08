import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

const minFontSize = 10;

const styles = StyleSheet.create({
  pinKey: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function PinKey({
  label,
  onPress,
  style,
  ...otherProps
}) {
  const finiteValue = val => (Number.isFinite(val) ? val : 0);
  const width = finiteValue(style && style.width);
  const height = finiteValue(style && style.height);
  const smallerSide = Math.min(width, height);

  if (smallerSide <= 0) {
    return null;
  }

  const paddings = finiteValue(style && style.padding) * 2;
  const fontSize = Math.max(
    smallerSide - paddings,
    minFontSize
  );

  return (
    <TouchableHighlight
      onPress={() => onPress(label)}
      underlayColor="gray"
      style={[
        styles.pinKey,
        style,
        { width, height }
      ]}
      {...otherProps}
    >
      <Text style={{ fontSize }}>
        {label}
      </Text>
    </TouchableHighlight>
  );
}

PinKey.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style
};

PinKey.defaultProps = {
  style: undefined
};
