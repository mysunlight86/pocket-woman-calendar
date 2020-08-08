export const typeSetToken = 'token';

export function setToken(token) {
  return {
    type: typeSetToken,
    token
  };
}
