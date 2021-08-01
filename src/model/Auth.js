import _ from 'lodash';
import EncryptedStorage from 'react-native-encrypted-storage';

const STORAGE_KEY = 'user_pin';

let _currentState = {
  token: generateToken(),
  attempt: 0,
};

export function verifyToken(token) {
  return _currentState.token === token;
}

export async function getToken(pin) {
  const storedPin = await getStoredPin();
  if (pin === null && pin === storedPin) return _currentState.token;
  if (pin === null && pin !== storedPin) return null;

  await delayAttempt();

  if (pin === storedPin) {
    updateState({ attempt: 0 });
    return _currentState.token;
  }

  updateState({ attempt: _currentState.attempt + 1 });
  return null;
}

module.exports.changePin = async function changePin(oldPin, newPin) {
  const token = await getToken(oldPin);
  if (!token) return null;
  if (!isPinValid(newPin)) return null;
  await setStoredPin(newPin);
  updateState({ token: generateToken() });
  return _currentState.token;
};

function updateState(partialState) {
  _currentState = { ..._currentState, ...partialState };
}

function generateToken() {
  return Math.random().toString(16);
}

function isPinValid(pin) {
  if (pin === null) return true;
  if (typeof pin !== 'string') return false;
  return /^\d{4}$/.test(pin);
}

async function getStoredPin() {
  const pin = await EncryptedStorage.getItem(STORAGE_KEY);
  return pin || null;
}

async function setStoredPin(pin) {
  if (pin === null) {
    await EncryptedStorage.removeItem(STORAGE_KEY);
    return;
  }
  await EncryptedStorage.setItem(STORAGE_KEY, pin);
}

const ATTEMPT_DELAY = 1000;
const ATTEMPT_DELAY_MAX = 5000;

function delayAttempt() {
  return new Promise(resolve => {
    _.delay(
      resolve,
      Math.min(ATTEMPT_DELAY_MAX, _currentState.attempt * ATTEMPT_DELAY)
    );
  });
}
