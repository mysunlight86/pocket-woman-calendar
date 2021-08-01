import React from 'react';

import initLocale from '../common/locale';
import AuthState from '../Component/AuthState';

import AuthProvider from '../features/auth/AuthProvider';

initLocale();

export default function App() {
  return (
    <AuthProvider>
      <AuthState />
    </AuthProvider>
  );
}
