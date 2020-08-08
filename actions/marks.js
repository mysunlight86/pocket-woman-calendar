import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

import getChanges from './getChanges';
import { getMarks, getPeriods } from '../selectors';
import {
  MARKS_SET,
  MARKS_REMOVE,
  MARKS_LOAD,
  MARKS_LOADED,
  MARKS_SAVE,
  MARKS_SAVED
} from '../const';

export function setMarks(marks) {
  return {
    type: MARKS_SET,
    marks
  };
}

export function removeMarks(marks) {
  return {
    type: MARKS_REMOVE,
    marks
  };
}

export function loadMarks() {
  return async dispatch => {
    dispatch({ type: MARKS_LOAD });
    try {
      const raw = await AsyncStorage.getItem('@calendar_marks');
      const marks = typeof raw === 'string' && raw !== ''
        ? JSON.parse(raw)
        : [];
      dispatch({ type: MARKS_LOADED, marks });
    } catch (err) {
      dispatch({ type: MARKS_LOADED, err });
    }
  };
}

const AsyncStorageSaveDebounced = _.debounce(getSavingMarks => {
  const marks = getSavingMarks();
  const data = JSON.stringify(marks);
  return AsyncStorage.setItem('@calendar_marks', data);
}, 500);

export function saveMarks() {
  return async (dispatch, getState) => {
    dispatch({ type: MARKS_SAVE });
    try {
      await AsyncStorageSaveDebounced(() => getMarks(getState()));
      dispatch({ type: MARKS_SAVED });
    } catch (err) {
      dispatch({ type: MARKS_SAVED, err });
    }
  };
}

export function markDate(date) {
  return async (dispatch, getState) => {
    const { remove, create } = getChanges(date, getPeriods(getState()));
    dispatch(removeMarks(remove));
    dispatch(setMarks(create));
    await dispatch(saveMarks());
  };
}
