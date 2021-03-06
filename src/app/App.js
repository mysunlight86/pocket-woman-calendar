import React from 'react';
import { Provider } from 'react-redux';

import initLocale from '../common/locale';
import store from './store';
import Router from './Router';

initLocale();

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
