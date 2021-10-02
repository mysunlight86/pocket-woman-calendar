import React from 'react';

import initLocale from '../common/locale';
import AuthDebugScreen from '../common/AuthDebugScreen';

initLocale();

export default function App() {
  return <AuthDebugScreen />;
}
