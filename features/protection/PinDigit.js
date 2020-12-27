import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PinDigit({ dialled, size, style }) {
  const finiteVal = val => (Number.isFinite(val) ? val : 0);
  const padding = finiteVal(style && style.padding);
  const glyphSize = finiteVal(size);
  if (glyphSize <= 0) {
    return null;
  }
  const blockSize = glyphSize + padding * 2;
  const blockStyle = [
    style,
    {
      width: blockSize,
      height: blockSize,
      padding
    }
  ];
  return dialled
    ? (<Icon name="asterisk" size={glyphSize} style={blockStyle} />)
    : (<View style={blockStyle} />);
}

PinDigit.propTypes = {
  dialled: PropTypes.bool,
  size: PropTypes.number,
  style: ViewPropTypes.style
};

PinDigit.defaultProps = {
  dialled: false,
  size: 0,
  style: undefined
};
