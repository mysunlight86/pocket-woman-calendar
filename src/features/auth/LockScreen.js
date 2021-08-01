import React from 'react';
import { View, Text } from 'react-native';

import { t } from 'i18n-js';

import AuthContext from './AuthContext';
import PinInput from './PinInput';
import styles from './styles';

export default class LockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      error: '',
    };
  }

  static contextType = AuthContext;

  render() {
    const message = this.getMessage();
    const { isProtected } = this.context;
    return (
      <View style={styles.screen}>
        <Text>{message}</Text>
        {isProtected && (
          <PinInput
            ref={this.inputRef}
            autoFocus={true}
            editable={!this.context.isLoading}
            onSubmitEditing={this.handleSubmit}
          />
        )}
      </View>
    );
  }

  componentDidMount() {
    const { token, isProtected } = this.context;
    if (!token && !isProtected) this.login();
  }

  getMessage() {
    if (this.context.isLoading) return t('Please Wait');
    if (this.state.error) return this.state.error;
    return t('Enter PIN code');
  }

  async login(pin) {
    const { login } = this.context;
    try {
      return await login(pin);
    } catch (error) {
      this.setState({ error: error.message });
      return null;
    }
  }

  handleSubmit = async ({ nativeEvent: { text: pin } }) => {
    const token = await this.login(pin);
    const { error } = this.state;
    if (token === null && !error) {
      this.setState({ error: t('Wrong PIN code! Try again.') });
    }
    this.inputRef.current.clear();
  };
}
