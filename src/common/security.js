const _ = require('lodash');

let _token;
let _attempt = 0;

module.exports.verifyToken = function verifyToken(token) {
  return _token === token;
};

module.exports.getToken = async function getToken(pin) {
  const _pin = await getPassword();
  if (pin === null && pin !== _pin) return null;
  await delayAttempt();
  if (pin === _pin) {
    resetAttempts();
    return _token;
  }
  return null;
};

module.exports.changePin = async function changePin(oldPin, newPin) {
  await delayAttempt();
  const _pin = await getPassword();
  if (_pin !== oldPin) return false;
  resetAttempts();
  if (newPin === null) {
    await removePassword();
    return true;
  }
  await setPassword(newPin);
  return true;
};

// TODO: Use Secure Storage to persist pin code

let _pin = null;

function getPassword() {
  return Promise.resolve(_pin);
}

function setPassword(pin) {
  _pin = pin;
  return Promise.resolve();
}

function removePassword() {
  _pin = null;
  return Promise.resolve();
}

function generateToken() {
  return Math.random().toString(16);
}

const ATTEMPT_DELAY = 1000;
const ATTEMPT_DELAY_MAX = 5000;

function delayAttempt() {
  return new Promise(resolve => {
    _.delay(resolve, Math.min(ATTEMPT_DELAY_MAX, _attempt++ * ATTEMPT_DELAY));
  });
}

function resetAttempts() {
  _attempt = 0;
}

function reset() {
  _token = generateToken();
}

reset();
