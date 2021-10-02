import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const pinRx = /^\d{0,4}$/;

export default class PinInput extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    hasError: PropTypes.bool,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    title: null,
    value: null,
    autoFocus: false,
    returnKeyType: 'done',
    hasError: false,
    onChangeText: () => {},
    onFocus: () => {},
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = { value: '' };
    this.styles = StyleSheet.create({
      input: {
        minWidth: 100,
      },
      field: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      inputBorder: { color: '#000000' },
      inputErrorBorder: { color: '#ff0000' },
    });
  }

  get value() {
    return typeof this.props.value === 'string'
      ? this.props.value
      : this.state.value;
  }

  focus() {
    return this.ref.current.focus();
  }

  blur() {
    return this.ref.current.blur();
  }

  clear() {
    this.setState({ value: '' });
  }

  isFocused() {
    return this.ref.current.isFocused();
  }

  render() {
    const { hasError } = this.props;

    const title = !this.props.title ? null : <Text>{this.props.title}</Text>;

    const input = (
      <TextInput
        {...this.props}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry={true}
        textContentType="none"
        textAlign="center"
        selectTextOnFocus={true}
        value={this.value}
        ref={this.ref}
        style={this.styles.input}
        underlineColorAndroid={
          hasError
            ? this.styles.inputErrorBorder.color
            : this.styles.inputBorder.color
        }
        onChangeText={this.handleTextChange}
        onFocus={this.handleFocus}
      />
    );

    return (
      <View style={this.styles.field}>
        {title}
        {input}
      </View>
    );
  }

  handleTextChange = text => {
    if (!pinRx.test(text)) return;
    this.setState({ value: text });
    this.props.onChangeText(text);
  };

  handleFocus = () => {
    this.props.onFocus();
    if (typeof this.props.value !== 'string') {
      this.clear();
    }
  };
}
