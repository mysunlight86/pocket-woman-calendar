import React, { useReducer, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  isProtected: false,
  token: null,
};

const reducer = (state, { payload }) => {
  return { ...state, ...payload };
};

export const AuthContext = createContext([initialState, () => {}]);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
