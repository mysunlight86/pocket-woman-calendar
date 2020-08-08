/* eslint-disable max-classes-per-file */

import React, { useState, useMemo } from 'react';
import { LocaleConfig } from 'react-native-calendars';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';
import thunkMiddleware from 'redux-thunk';
import i18n from 'i18n-js';

import 'moment/locale/ru';
import 'moment/locale/uk';
import 'moment/locale/en-gb';

import * as en from './i18n/en.json';
import * as ru from './i18n/ru.json';
import * as uk from './i18n/uk.json';

import Authenticator from './auth/Authenticator';
import rootReducer from './reducers';
import AuthenticateContext from './components/AuthenticateContext';
import Router from './components/Router';

//
// Setup localization
//

i18n.fallbacks = true;
i18n.translations = { en, ru, uk };
const { languageTag } = RNLocalize.findBestAvailableLanguage(['en', 'ru', 'uk']);
i18n.locale = languageTag;
moment.locale(i18n.locale);

Object.keys(i18n.translations).forEach(lang => {
  const locale = moment().locale(lang).localeData();
  LocaleConfig.locales[lang] = {
    monthNames: locale.months(),
    monthNamesShort: locale.monthsShort(),
    dayNames: locale.weekdays(),
    dayNamesShort: locale.weekdaysShort(),
    today: i18n.t('Today'),
  };
});

LocaleConfig.locales[i18n.currentLocale()] = {
  monthNames: moment.months(),
  monthNamesShort: moment.monthsShort(),
  dayNames: moment.weekdays(),
  dayNamesShort: moment.weekdaysShort(),
  today: i18n.t('Today'),
};

LocaleConfig.defaultLocale = i18n.currentLocale();

//
// configure store
//

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

//
// Application
//

export default function App() {
  const [auth, setAuth] = useState({
    token: null,
    error: null,
    inProcess: false
  });

  const authContext = useMemo(
    () => ({
      ...auth,

      async signIn(pin) {
        setAuth({
          ...auth,
          error: null,
          inProgress: true
        });
        const token = await Authenticator.getToken(pin);
        if (token) {
          setAuth({
            inProgress: false,
            error: null,
            token
          });
          return;
        }
        setAuth({
          inProgress: false,
          error: new Error(i18n.t('Wrong PIN!')),
          token: null
        });
      },

      signOut(token) {
        setAuth({
          inProgress: false,
          error: null,
          token: null
        });
        Authenticator.deleteToken(token);
      },
    }),
    [auth]
  );

  return (
    <Provider store={store}>
      <AuthenticateContext.Provider value={authContext}>
        <Router />
      </AuthenticateContext.Provider>
    </Provider>
  );
}
