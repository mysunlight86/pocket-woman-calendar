import moment from 'moment';
import { add, remove, selectIsLoaded } from '../records/recordsSlice';
import { selectIntervals } from './selectors';

const removePressZone = int => int.map(({ from, to }) => ({
  date: from,
  from: moment(from),
  to: moment(to)
}));

const movePressZoneDays = 5;

const movePressZone = int => int.map(({ from, to }) => ({
  date: from,
  from: moment(from).subtract(movePressZoneDays, 'days'),
  to: moment(to).add(movePressZoneDays, 'days'),
}));

const matchZones = (date, zones) => zones.filter(
  ({ from, to }) => date.isSameOrAfter(from, 'day') && date.isSameOrBefore(to, 'day')
);

const execUpdate = (
  tappedDay,
  intervals,
  execAdd,
  execRemove
) => {
  const momentTappedDay = moment(tappedDay);
  const toRemove = matchZones(momentTappedDay, removePressZone(intervals)).map(({ date }) => date);
  if (toRemove.length) {
    execRemove(toRemove);
    return;
  }
  const toMove = matchZones(momentTappedDay, movePressZone(intervals)).map(({ date }) => date);
  if (toMove.length) {
    execRemove(toMove);
  }
  execAdd([tappedDay]);
};

export const dayPressed = tappedDay => (dispatch, getState) => {
  const state = getState();
  const isLoaded = selectIsLoaded(state);
  if (!isLoaded) return;
  execUpdate(
    tappedDay,
    selectIntervals(state),
    toAdd => dispatch(add(toAdd)),
    toRemove => dispatch(remove(toRemove))
  );
};

export default { dayPressed };
