import React from 'react';
import { Provider } from 'react-redux';

import initLocale from './locale';
import store from './app/store';
import Router from './Router';

initLocale();

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
