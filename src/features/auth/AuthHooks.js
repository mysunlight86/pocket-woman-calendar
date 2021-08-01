import { useContext } from 'react';
import * as api from '../../model/Auth';
import { AuthStateContext } from './AuthStateProvider';

export function useAuthState() {
  return useContext(AuthStateContext);
}

export function useAuthApi() {
  return api;
}

export function useAuth() {
  const [state, dispatch] = useAuthState();

  const isProtected = (pin, token) =>
    (pin !== '' && token) || (pin === '' && !token);

  const login = async pin => {
    const token = await api.getToken(pin);
    dispatch({
      payload: {
        token,
        isProtected: isProtected(pin, token),
      },
    });
    return token !== null;
  };

  const logout = () => {
    dispatch({
      payload: {
        token: null,
      },
    });
  };

  const probe = () => {
    return login('');
  };

  return { state, dispatch, login, logout, probe, ...api };
}
