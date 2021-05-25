import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';

import { selectMarks, addMarks, addRecord } from './calendarSlice';

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

export default function Calendar() {
  const dispatch = useDispatch();
  const marks = useSelector(selectMarks);

  const markedDates = marks.reduce((result, date) => {
    result[date] = {
      color: 'red',
      textColor: 'white',
    };
    return result;
  }, {});

  const handleDayPress = ({ dateString }) => dispatch(addRecord(dateString));

  console.log(markedDates);

  return (
    <CalendarList
      markedDates={markedDates}
      onDayPress={handleDayPress}
      markingType="period"
    />
  );
}
