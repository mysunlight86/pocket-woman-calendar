import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';

const pinRx = /^\d{0,4}$/;

const PinInput = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  const {
    title,
    returnKeyType,
    autoFocus,
    editable,
    hasError,
    onChangeText,
    onSubmit,
    onEndEditing,
  } = props;

  const handleTextChange = text => {
    if (pinRx.test(text)) {
      setValue(text);
      onChangeText(text);
    }
  };

  const handleSubmitEditing = () => {
    onSubmit(value);
  };

  const handleFocus = () => {
    setValue('');
  };

  const handleEndEditing = () => {
    onEndEditing(value);
  };

  const input = (
    <TextInput
      ref={ref}
      style={styles.input}
      keyboardType="numeric"
      maxLength={4}
      secureTextEntry={true}
      textContentType="none"
      textAlign="center"
      returnKeyType={returnKeyType}
      autoFocus={autoFocus}
      editable={editable}
      value={value}
      underlineColorAndroid={
        hasError ? styles.inputErrorBorder.color : styles.inputBorder.color
      }
      onChangeText={handleTextChange}
      onSubmitEditing={handleSubmitEditing}
      onFocus={handleFocus}
      onEndEditing={handleEndEditing}
    />
  );

  return (
    <View style={styles.field}>
      {title !== null && <Text>{title}</Text>}
      {input}
    </View>
  );
});

export default PinInput;

PinInput.propTypes = {
  title: PropTypes.string,
  autoFocus: PropTypes.bool,
  returnKeyType: PropTypes.string,
  editable: PropTypes.bool,
  hasError: PropTypes.bool,
  onSubmit: PropTypes.func,
  onEndEditing: PropTypes.func,
  onChangeText: PropTypes.func,
};

PinInput.defaultProps = {
  title: null,
  autoFocus: false,
  returnKeyType: 'done',
  editable: true,
  onSubmit: () => {},
  onEndEditing: () => {},
  onChangeText: () => {},
};
