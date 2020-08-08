const mockToken = 'token';
const mockPin = '1234';

export default {
  check(token) {
    return new Promise(resolve => setTimeout(() => {
      resolve(token === mockToken);
    }, 100));
  },

  getToken(pin) {
    return new Promise(resolve => setTimeout(() => {
      resolve(
        pin === mockPin
          ? mockToken
          : null
      );
    }), 800);
  },

  deleteToken(token) {
  },
};
