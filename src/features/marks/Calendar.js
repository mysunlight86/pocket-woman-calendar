import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid, createSelector } from '@reduxjs/toolkit';

import { markAdded, markRemoved, marksSelectors } from './marksSlice';

/*

Example data for calendar:

markedDates: {
  '2020-04-02': {color: 'red', textColor: 'white', startingDay: true},
  '2020-04-03': {color: 'red', textColor: 'white'},
  '2020-04-04': {color: 'red', textColor: 'white'},
  '2020-04-05': {color: 'red', textColor: 'white', endingDay: true},
  '2020-05-20': {textColor: 'green'},
  '2020-05-22': {startingDay: true, color: 'green'},
  '2020-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
  '2020-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
},

onDayPress event handler arg

{"dateString": "2021-05-18", "day": 18, "month": 5, "timestamp": 1621296000000, "year": 2021}

Props:

<CalendarList markedDates={markedDates} markingType={markingType} onDayPress={onDayPress} />

*/

function* period(mark, start, end) {
  const { date: dateString } = mark;
  console.log('!!!', dateString, start, end);
  const date = new Date(`${dateString}T00:00:00.0Z`);
  const startYear = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const startDay = date.getUTCDate();
  for (let i = start; i < end; i++) {
    date.setUTCFullYear(startYear);
    date.setUTCMonth(month);
    date.setUTCDate(startDay + i);
    yield {
      ...mark,
      date: date.toISOString().split('T')[0],
      startingDay: i === start,
      endingDay: i === end - 1,
      color: 'red',
      textColor: 'white',
    };
  }
}

const treeDaysPeriodsSelector = createSelector(
  [marksSelectors.selectAll],
  allMarks => {
    console.log('!!', allMarks);
    return allMarks.map(mark => [...period(mark, 0, 3)]).flat();
  }
);

const treeDaysPeriodsByDateSelector = createSelector(
  [treeDaysPeriodsSelector],
  allMarks => {
    console.log('!', allMarks.length);
    return allMarks.reduce((result, mark) => {
      const { date } = mark;
      result[date] = mark;
      return result;
    }, {});
  }
);

const markedDatesSelector = createSelector(
  [marksSelectors.selectAll],
  allMarks =>
    allMarks.reduce((result, { date, id }) => {
      result[date] = {
        id,
        color: 'red',
        textColor: 'white',
        startingDay: true,
        endingDay: true,
      };
      return result;
    }, {})
);

export default function Calendar() {
  const dispatch = useDispatch();
  const markedDates = useSelector(treeDaysPeriodsByDateSelector);

  console.log(markedDates);

  const handleDayPress = ({ dateString }) => {
    if (markedDates.hasOwnProperty(dateString)) {
      console.log('remove', dateString);
      dispatch(markRemoved(markedDates[dateString].id));
      return;
    }
    dispatch(
      markAdded({
        id: nanoid(),
        date: dateString,
      })
    );
  };

  return (
    <CalendarList
      markedDates={markedDates}
      onDayPress={handleDayPress}
      markingType="period"
    />
  );
}
