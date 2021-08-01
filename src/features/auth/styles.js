import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  input: {
    minWidth: 100,
  },
  inputBorder: { color: '#000000' },
  inputErrorBorder: { color: '#ff0000' },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
  },
  loadingIcon: {
    fontSize: 24,
  },
  okIcon: {
    fontSize: 24,
    color: 'green',
  },
});
