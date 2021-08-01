import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';

const pinRx = /^\d{0,4}$/;

export default class PinInputNew extends React.Component {
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
  }

  get value() {
    return typeof this.props.value === 'string'
      ? this.props.value
      : this.state.value;
  }

  focus() {
    console.log('focus');
    return this.ref.current.focus();
  }

  blur() {
    return this.ref.current.blur();
  }

  clear() {
    this.setState({ value: '' });
  }

  isFocused() {
    return this.ref.current.blur();
  }

  renderInput() {
    const { hasError } = this.props;

    return (
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
        style={styles.input}
        underlineColorAndroid={
          hasError ? styles.inputErrorBorder.color : styles.inputBorder.color
        }
        onChangeText={this.handleTextChange}
        onFocus={this.handleFocus}
      />
    );
  }

  render() {
    return (
      <View style={styles.field}>
        {this.renderTitle()}
        {this.renderInput()}
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

  renderTitle() {
    if (!this.props.title) {
      return null;
    }
    return <Text>{this.props.title}</Text>;
  }
}
