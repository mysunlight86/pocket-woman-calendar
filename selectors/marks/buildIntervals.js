import moment from 'moment';

export default function buildIntervals(marks, length) {
  return marks.map(mark => ({
    from: mark,
    to: moment(mark).add(length - 1, 'days').format('YYYY-MM-DD')
  }));
}
