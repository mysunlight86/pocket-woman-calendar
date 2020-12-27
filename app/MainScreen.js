import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CalendarContainer from '../features/calendar/CalendarContainer';
import Nav from './Nav';

import { selectIsLoaded, load } from '../features/records/recordsSlice';

export default function MainScreen({ navigation: { openDrawer } }) {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectIsLoaded);

  useEffect(() => {
    if (!isLoaded) dispatch(load());
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Nav onHamburgerPress={() => openDrawer()} />
      { isLoaded ? (<CalendarContainer />) : (<Text>Loading...</Text>) }
    </View>
  );
}

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired
  }).isRequired
};
