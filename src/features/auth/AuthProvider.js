import React, { useReducer, useMemo, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  isProtected: false,
  token: null,
};

export const AuthContext = createContext([initialState, () => {}]);

const reducer = (state, { payload }) => {
  return { ...state, ...payload };
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
