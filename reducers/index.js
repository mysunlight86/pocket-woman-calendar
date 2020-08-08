import { combineReducers } from 'redux';
import marks from './marks';
import parameters from './parameters';
import storageDebugData from './storageDebugData';

export default combineReducers({
  marks, // marks collection and status
  parameters,
  storageDebugData
});
