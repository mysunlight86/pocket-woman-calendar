import React from 'react';

import initLocale from '../common/locale';

import AuthProvider from '../features/auth/AuthProvider';
import AuthDebugScreen from '../common/AuthDebugScreen';

initLocale();

export default function App() {
  return (
    <AuthProvider>
      <AuthDebugScreen />
    </AuthProvider>
  );
}
