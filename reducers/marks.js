import { combineReducers } from 'redux';

import {
  MARKS_SET,
  MARKS_REMOVE,
  MARKS_LOAD,
  MARKS_LOADED,
  MARKS_SAVED
} from '../const';

export default combineReducers({
  marksCollection: (
    marks = [],
    {
      type,
      marks: changes
    }
  ) => {
    const byDatesFilter = dates => ({ date }) => !dates.includes(date);
    switch (type) {
      case MARKS_SET:
        return [...marks, ...changes];
      case MARKS_REMOVE:
        return marks.filter(byDatesFilter(changes.map(({ date }) => date)));
      case MARKS_LOADED:
        return changes;
      default:
        return marks;
    }
  },

  status: (state = 'empty', { type, err }) => {
    switch (type) {
      case MARKS_LOAD:
        return 'loading';
      case MARKS_LOADED:
      case MARKS_SAVED:
        return !err ? 'loaded' : 'error';
      default:
        return state;
    }
  },

  err: (state = null, { type, err }) => (type === MARKS_LOADED || type === MARKS_SAVED
    ? (err || null)
    : state
  ),
});
