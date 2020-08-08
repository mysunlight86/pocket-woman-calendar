import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CalendarList } from 'react-native-calendars';
import { getMarkedDates } from '../selectors';
import { markDate } from '../actions';

/*

Example data from redux

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

markedDates: state.marks.map(
  mark => ({
    date: mark.date,
    color: mark.color,
  })
).reduce(
  (acum, mark) => {
    acum[mark.date] = {
      color: mark.color,
      textColor: 'white'
    };
    return acum;
  }, {}
),

*/

const mapStateToProps = state => ({
  markedDates: getMarkedDates(state),
  markingType: 'period'
});

const mapDispatchToProps = {
  onDayPress: ({ dateString }) => markDate(dateString)
};

function CalendarContainer({
  markedDates,
  markingType,
  onDayPress
}) {
  return (<CalendarList markedDates={markedDates} markingType={markingType} onDayPress={onDayPress} />);
}

CalendarContainer.propTypes = {
  markedDates: PropTypes.objectOf(
    PropTypes.shape({
      color: PropTypes.string,
      textColor: PropTypes.string,
      startingDay: PropTypes.bool,
      endingDay: PropTypes.bool,
    })
  ).isRequired,
  markingType: PropTypes.string.isRequired,
  onDayPress: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
