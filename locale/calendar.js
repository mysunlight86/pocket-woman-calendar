import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import i18n from 'i18n-js';

function buildLocale(localeData) {
  return {
    monthNames: localeData.months(),
    monthNamesShort: localeData.monthsShort(),
    dayNames: localeData.weekdays(),
    dayNamesShort: localeData.weekdaysShort(),
    today: i18n.t('Today'),
  };
}

function getLocale(lang) {
  return buildLocale(moment().locale(lang).localeData());
}

function getCurrentLocale() {
  return buildLocale(moment);
}

export default function () {
  Object.keys(i18n.translations).forEach(lang => {
    LocaleConfig.locales[lang] = getLocale(lang);
  });
  LocaleConfig.locales[i18n.currentLocale()] = getCurrentLocale();
  LocaleConfig.defaultLocale = i18n.currentLocale();
}
