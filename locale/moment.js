import moment from 'moment';
import i18n from 'i18n-js';

import 'moment/locale/ru';
import 'moment/locale/uk';
import 'moment/locale/en-gb';

export default function () {
  moment.locale(i18n.currentLocale());
}
