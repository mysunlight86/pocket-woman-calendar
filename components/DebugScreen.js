import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  changeStorageValue,
  fetchStorageDebugData,
  loadStorageValueAsync
} from '../actions';

import { getMarks } from '../selectors';

/* disable some rules in debug component */
/* eslint-disable react/prop-types */

async function fetchData() {
  try {
    const raw = await AsyncStorage.getItem('@calendar_marks');
    const marks = typeof raw === 'string' && raw !== ''
      ? JSON.parse(raw)
      : [];
    return [
      `count: ${marks.length}`,
      marks.map(item => item.date)
    ].join(', ');
  } catch (err) {
    return err.message;
  }
}

const markToString = mark => Object.keys(mark).map(key => `${key}: ${mark[key]}`).join('; ');

function DebugScreen({
  marks,
  storageKeys,
  someStorageValue,
  onChangeValue,
  fetchDataAsync,
  state
}) {
  const [loaded] = useState(true);

  useEffect(() => {
    fetchDataAsync();
  }, [loaded]);

  const [data, setData] = useState('no data');

  useEffect(() => {
    fetchData().then(dt => setData(dt));
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Debug Screen</Text>
      <Text>Marks:</Text>
      <Text>
        { marks && marks.map ? marks.map(markToString).join(' | ') : 'no-marks' }
      </Text>
      <Text>Count:</Text>
      <Text>{ marks && marks.count }</Text>
      <Text>Storage Keys:</Text>

      <Text>{ storageKeys.join('; ') }</Text>
      <Button
        onPress={() => {}}
        title="test"
      />
      <Text>Storage Data</Text>
      <Text>{data}</Text>
      <Text>{state.marks.status}</Text>
      <TextInput
        value={someStorageValue}
        onChangeText={text => onChangeValue(text)}
      />
    </View>
  );
}

function mapStateToProps(state) {
  const {
    marks,
    storageDebugData: {
      keys: storageKeys,
    },
    someStorageValue
  } = state;

  return {
    marks: getMarks({ marks }),
    storageKeys,
    someStorageValue,
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeValue(value) {
      dispatch(changeStorageValue(value));
    },
    fetchDataAsync() {
      dispatch(loadStorageValueAsync());
      dispatch(fetchStorageDebugData());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DebugScreen);
