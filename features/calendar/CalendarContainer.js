import { connect } from 'react-redux';
import { CalendarList } from 'react-native-calendars';
import { selectMarks } from './selectors';
import { dayPressed } from './actions';

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

Props:

<CalendarList markedDates={markedDates} markingType={markingType} onDayPress={onDayPress} />

*/

const mapStateToProps = state => ({
  markedDates: selectMarks(state),
  markingType: 'period'
});

const mapDispatchToProps = {
  onDayPress: ({ dateString }) => dayPressed(dateString)
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarList);
