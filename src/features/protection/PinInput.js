import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pinCodeInput: {
    minWidth: 100,
  },
  pinCodeBorder: { color: '#000000' },
  pinCodeErrorBorder: { color: '#ff0000' },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default class PinInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  pinRx = /^\d{0,4}$/;

  state = { value: '' };

  static propTypes = {
    title: PropTypes.string,
    autoFocus: PropTypes.bool,
    returnKeyType: PropTypes.string,
    editable: PropTypes.bool,
    hasError: PropTypes.bool,
    onSubmit: PropTypes.func,
    onEndEditing: PropTypes.func,
    onChangeText: PropTypes.func,
  };

  static defaultProps = {
    title: null,
    autoFocus: false,
    returnKeyType: 'done',
    editable: true,
    onSubmit: () => {},
    onEndEditing: () => {},
    onChangeText: () => {},
  };

  renderInput() {
    return (
      <TextInput
        ref={this.inputRef}
        style={styles.pinCodeInput}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry={true}
        textContentType="none"
        textAlign="center"
        returnKeyType={this.props.returnKeyType}
        autoFocus={this.props.autoFocus}
        editable={this.props.editable}
        value={this.state.value}
        underlineColorAndroid={
          this.props.hasError
            ? styles.pinCodeErrorBorder.color
            : styles.pinCodeBorder.color
        }
        onChangeText={this._handleTextChange}
        onSubmitEditing={this._handleSubmitEditing}
        onFocus={this._handleFocus}
        onEndEditing={this._handleEndEditing}
      />
    );
  }

  render() {
    const { title } = this.props;
    if (!title) return this.renderInput();
    return (
      <View style={styles.line}>
        <Text>{title}</Text>
        {this.renderInput()}
      </View>
    );
  }

  focus() {
    this.inputRef.current.focus();
  }

  clear() {
    this.inputRef.current.clear();
  }

  _handleTextChange = text => {
    if (!this.pinRx.test(text)) return;
    this.setState({ value: text });
    this.props.onChangeText(text);
  };

  _handleSubmitEditing = () => {
    this.props.onSubmit(this.state.value);
  };

  _handleFocus = () => {
    this.setState({ value: '' });
  };

  _handleEndEditing = () => {
    this.props.onEndEditing(this.state.value);
  };
}
