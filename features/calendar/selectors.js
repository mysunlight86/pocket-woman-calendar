import moment from 'moment';
import { createSelector } from '@reduxjs/toolkit';
import { selectRecords } from '../records/recordsSlice';

const intervalDays = 3;

export const selectIntervals = createSelector(selectRecords, records => records.map(record => ({
  from: record,
  to: moment(record).add(intervalDays - 1, 'days').format('YYYY-MM-DD')
})));

function* daysIterator({ from, to }) {
  const day = moment(from);
  yield day.format('YYYY-MM-DD');
  while (!day.isSame(to, 'day')) {
    day.add(1, 'days');
    yield day.format('YYYY-MM-DD');
  }
}

const markColor = 'red';
const markTextColor = 'white';

const marks = int => int.reduce((result, { from, to }) => (
  [...daysIterator({ from, to })].reduce((subresult, date, index, { length }) => ({
    ...subresult,
    [date]: {
      color: markColor,
      textColor: markTextColor,
      startingDay: index === 0,
      endingDay: index === length - 1
    }
  }), result)
), {});

export const selectMarks = createSelector(
  selectIntervals,
  int => marks(int)
);

export default selectMarks;
