import { createContext } from 'react';

export default createContext({
  token: null,
  inProgress: false,
  error: null,
  signIn: () => { },
  singOut: () => { }
});
