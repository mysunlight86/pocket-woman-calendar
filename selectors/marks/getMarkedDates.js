import moment from 'moment';

function* daysIterator({ from, to }) {
  const day = moment(from);
  yield day.format('YYYY-MM-DD');
  while (!day.isSame(to, 'day')) {
    day.add(1, 'days');
    yield day.format('YYYY-MM-DD');
  }
}

export default function getMarkedDates(marks) {
  return marks.reduce((
    marketDates,
    {
      from,
      to,
      color,
      textColor
    }
  ) => (
    [...daysIterator({ from, to })].reduce((
      a,
      date, index, { length }
    ) => ({
      ...a,
      [date]: {
        color,
        textColor,
        startingDay: index === 0,
        endingDay: index === length - 1
      }
    }), marketDates)
  ), {});
}
