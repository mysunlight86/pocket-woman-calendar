import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getToken } from '../../model/Auth';
import PinInput from './PinInput';
import styles from './styles';

export default function PinValidator({ autoFocus, onPassed, onFailed }) {
  const [isLoading, setLoading] = useState(true);
  const [isPassed, setPassed] = useState(null);
  const [pin, setPin] = useState('');

  const onTokenRecived = useCallback(
    (recivedPin, token) => {
      setLoading(false);
      if (token !== null) {
        setPassed(true);
        onPassed({ pin: recivedPin, token });
      } else onFailed({ recivedPin });
    },
    [onPassed, onFailed]
  );

  useEffect(() => {
    (async () => {
      onTokenRecived('', await getToken());
    })();
  }, [onTokenRecived]);

  const handlePinEntered = async () => {
    setLoading(true);
    onTokenRecived(pin, await getToken(pin));
  };

  if (isPassed !== null) {
    return <Icon name="check-circle" style={styles.okIcon} />;
  }
  if (isLoading) {
    return <Icon name="timer-sand" style={styles.loadingIcon} />;
  }
  return (
    <PinInput
      autoFocus={autoFocus}
      onSubmitEditing={handlePinEntered}
      onChangeText={setPin}
    />
  );
}

PinValidator.propTypes = {
  autoFocus: PropTypes.bool,
  onPassed: PropTypes.func,
  onFailed: PropTypes.func,
};

PinValidator.defaultProps = {
  autoFocus: false,
  onPassed: () => {},
  onFailed: () => {},
};
