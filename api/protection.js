import AsyncStorage from '@react-native-community/async-storage';

const attemptDelay = 1000;
const attemptDelayMax = 5000;

const delay = attempt => new Promise(resolve => setTimeout(
  resolve,
  Math.min(attemptDelayMax, attempt * attemptDelay)
));

const getAttempt = async () => +(await AsyncStorage.getItem('@attempt')) || 0;
const setAttempt = attempt => AsyncStorage.setItem('@attempt', String(attempt));
const removeAttempt = () => AsyncStorage.removeItem('@attempt');

const getPin = async () => (await AsyncStorage.getItem('@code')) || null;
const setPin = pin => AsyncStorage.setItem('@code', pin);
const removePin = () => AsyncStorage.removeItem('@code');

const tokens = new Set();

export function verify(token) {
  return tokens.has(String(token));
}

export function discard(user, token) {
  tokens.delete(`${user}/${token}`);
}

export async function checkPin(pin) {
  const attempt = pin === null ? 0 : await getAttempt();
  await delay(attempt);
  if (pin === await getPin()) {
    await removeAttempt();
    return true;
  }
  if (pin !== null) {
    await setAttempt(attempt + 1);
  }
  return false;
}

export async function getToken(pin) {
  if (!await checkPin(pin)) return null;
  const token = String(Math.random());
  tokens.add(token);
  return token;
}

export async function changePin(oldPin, newPin) {
  tokens.clear();
  const token = await getToken(oldPin);
  if (!token) return null;
  if (newPin === null) {
    await removePin();
    return token;
  }
  await setPin(newPin);
  return token;
}
