import initText from './text';
import initMoment from './moment';
import initCalendar from './calendar';

export default function initLocale() {
  initText();
  initMoment();
  initCalendar();
}
