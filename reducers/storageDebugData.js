export default function storageDebugData(
  state = {
    keys: []
  },
  {
    type,
    keys = [],
    ...data
  }
) {
  if (type === 'SET_STORAGE_DEBUG_DATA') {
    return { keys, ...data };
  }
  return state;
}
