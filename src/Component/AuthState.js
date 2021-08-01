import React from 'react';
import * as Api from '../model/Auth';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import PinInput from '../features/auth/PinInput';
import { AuthContext } from '../features/auth/AuthProvider';

export default class AuthState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: '',
      newPin: '',
      isLoading: true,
      isProtectedBackend: false,
      isTokenValid: false,
    };

    this.styles = StyleSheet.create({
      screen: {
        flex: 1,
        alignItems: 'stretch',
      },
    });

    this.inputRef = React.createRef();

    this.handleChangePin = this.handleChangePin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.probeProtection();
  }

  async probeProtection() {
    const token = await Api.getToken('');
    const [, dispatch] = this.context;

    dispatch({
      payload: {
        token,
        isProtected: token === null,
      },
    });

    this.setState({
      isLoading: false,
      isProtectedBackend: token === null,
      isTokenValid: token !== null && Api.verifyToken(token),
    });
  }

  async handleChangePin() {
    const { pin, newPin } = this.state;
    const { login } = this.context;
    const token = await Api.changePin(pin, newPin);
    if (token) login(newPin);
  }

  async handleLogin() {
    const { pin } = this.state;
    this.context.login(pin);
  }

  async handleLogout() {
    this.context.logout();
  }

  handleClear = () => {
    this.inputRef.current.clear();
  };

  render() {
    const [{ isProtected, token }] = this.context;
    const { isLoading, isProtectedBackend, isTokenValid } = this.state;
    const { navigation } = this.props;

    return (
      <View style={this.styles.screen}>
        <Text>Hello World! This is Auth status</Text>
        <Text>{`isLoading: ${isLoading}`}</Text>
        <Text>{`token: ${token}`}</Text>
        <Text>{`is token valid: ${isTokenValid}`}</Text>
        <Text>{`isProtected: ${isProtected}`}</Text>
        <Text>{`isProtectedBackend: ${isProtectedBackend}`}</Text>
        <Text>pin:</Text>
        <TextInput
          onChangeText={pin => this.setState({ pin })}
          value={this.state.pin}
        />
        <Button onPress={this.handleLogin} title="Login" />
        <Button onPress={this.handleLogout} title="Logout" />
        <Text>new pin:</Text>
        <TextInput
          onChangeText={newPin => this.setState({ newPin })}
          value={this.state.newPin}
        />
        <Button onPress={this.handleChangePin} title="change pin" />
        <PinInput />
        <PinInput title="Hello World" ref={this.inputRef} />
        <Button onPress={this.handleClear} title="clear" />

        <Button
          onPress={() => navigation.navigate('ChangePin', { })}
          title="Change Pin"
        />

        <Button
          onPress={() => navigation.navigate('ChangePin', { title: 'remove pin', caption: 'remove' })}
          title="Remove Pin"
        />

        <Button
          onPress={() => navigation.navigate('PinValidator', { passedRoute: 'ChangePin', title: 'remove pin', message: 'check' })}
          title="Change Pin 2"
        />

        <Button
          onPress={() => navigation.navigate('ChangePin', { passedRoute: 'ChangePin', title: 'Change Pin', message: 'check' })}
          title="Change Pin 3"
        />
      </View>
    );
  }
}
