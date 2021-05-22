import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import * as en from './lang/en.json';
import * as ru from './lang/ru.json';
import * as uk from './lang/uk.json';

export default function () {
  i18n.fallbacks = true;
  i18n.translations = { en, ru, uk };
  i18n.locale = RNLocalize.findBestAvailableLanguage(['en', 'ru', 'uk']).languageTag;
}
