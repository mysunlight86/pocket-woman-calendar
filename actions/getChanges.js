import moment from 'moment';

const zone = 5;

const getRemoveZone = periods => periods.map(({
  from,
  to
}) => ({
  date: from,
  from: moment(from),
  to: moment(to)
}));

const getMoveZone = periods => periods.map(({
  from,
  to
}) => ({
  moveFrom: from,
  from: moment(from).subtract(zone, 'days'),
  to: moment(to).add(zone, 'days'),
}));

const matchZones = (date, zones) => zones.filter(({
  from,
  to
}) => date.isSameOrAfter(from, 'day') && date.isSameOrBefore(to, 'day'));

export default function getChanges(tap, periods) {
  const tapDate = moment(tap);
  const remove = matchZones(
    tapDate,
    getRemoveZone(periods)
  );
  const move = matchZones(
    tapDate,
    getMoveZone(periods)
  );
  return {
    remove: remove.length !== 0
      ? remove.map(({ date }) => ({ date }))
      : move.map(({ moveFrom }) => ({ date: moveFrom })),
    create: remove.length === 0
      ? [{ date: tap }]
      : [],
    conflict: move.length > 1
  };
}
