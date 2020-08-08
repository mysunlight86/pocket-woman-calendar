import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CalendarContainer from './CalendarContainer';
import { getMarksStatus } from '../selectors';
import { loadMarks } from '../actions';

function MainScreen({
  status, loadRecords
}) {
  useEffect(() => {
    if (status === 'empty') {
      loadRecords();
    }
  }, [status]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {
        status === 'loaded'
          ? (<CalendarContainer />)
          : (<Text>Loading...</Text>)
      }
    </View>
  );
}

MainScreen.propTypes = {
  status: PropTypes.string.isRequired,
  loadRecords: PropTypes.func.isRequired
};

const mapStateToProp = state => ({
  status: getMarksStatus(state)
});

const mapDispatchToProp = {
  loadRecords: loadMarks
};

export default connect(mapStateToProp, mapDispatchToProp)(MainScreen);
