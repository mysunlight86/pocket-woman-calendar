import AsyncStorage from '@react-native-community/async-storage';

export const get = ({ key }) => AsyncStorage.getItem(`@data/${key}`);

export const set = ({ key, value }) => AsyncStorage.setItem(
  `@data/${key}`,
  typeof value === 'string' ? value : JSON.stringify(value)
);

export const remove = ({ key }) => AsyncStorage.removeItem(`@data/${key}`);
