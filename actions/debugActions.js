import AsyncStorage from '@react-native-community/async-storage';

export function fetchStorageDebugData() {
  return async dispatch => {
    let keys = [];
    let error = null;
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      error = e;
    }
    dispatch({
      type: 'SET_STORAGE_DEBUG_DATA',
      keys,
      error
    });
  };
}

export function changeStorageValue(value) {
  return async dispatch => {
    dispatch({
      type: 'change storage value',
      value
    });
    try {
      await AsyncStorage.setItem('@some_value', value);
    } catch (error) {
      dispatch({
        type: 'SET_STORAGE_DEBUG_DATA',
        keys: [],
        error
      });
    }
  };
}

export function loadStorageValueAsync() {
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem('@some_value');
      dispatch({
        type: 'change storage value',
        value
      });
    } catch (error) {
      dispatch({
        type: 'SET_STORAGE_DEBUG_DATA',
        keys: [],
        error
      });
    }
  };
}
