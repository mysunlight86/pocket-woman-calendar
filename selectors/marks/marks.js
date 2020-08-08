import { createSelector } from 'reselect';
import buildIntervals from './buildIntervals';
import _getMarkedDates from './getMarkedDates';

const getMarksState = ({
  marks = {}
} = {}) => marks;

export const getMarks = state => getMarksState(state).marksCollection || [];

export const getMarkCount = state => state.parameters.markLength;

export const getPeriods = createSelector(
  getMarks,
  getMarkCount,
  (marks, marksCount) => (buildIntervals(marks.map(({ date }) => date), marksCount))
);

export const getMarksStatus = state => getMarksState(state).status;

export const getMarksError = state => getMarksState(state).err;

const getColor = state => state.parameters.markColor;

const getTextColor = state => state.parameters.textColor;

export const getMarkedDates = createSelector(
  getPeriods,
  getColor,
  getTextColor,
  (periods, color, textColor) => _getMarkedDates(
    periods.map(({ from, to }) => ({
      from, to, color, textColor
    }))
  )
);
