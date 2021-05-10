import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Nav from './Nav';

import { selectIsLoaded, load } from '../features/records/recordsSlice';
import { signOut } from '../features/protection/protectionSlice';

export default function MainScreen({ navigation: { openDrawer, navigate } }) {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectIsLoaded);

  useEffect(() => {
    if (!isLoaded) dispatch(load());
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Nav onHamburgerPress={() => openDrawer()} />
      <Text>Hello World!</Text>
      <Button
        title="sign out"
        onPress={() => {
          dispatch(signOut());
        }}
      />
    </View>
  );
}

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
