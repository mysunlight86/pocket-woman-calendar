import { t } from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage';
import { verify } from './protection';

const protect = action => ({ token, ...request }) => {
  if (!verify(token)) {
    throw new Error(t('Invalid token.'));
  }
  return action(request);
};

export const get = protect(({ key }) => AsyncStorage.getItem(`@protected-data/${key}`));

export const set = protect(({ key, value }) => AsyncStorage.setItem(
  `@protected-data/${key}`,
  typeof value === 'string' ? value : JSON.stringify(value)
));

export const remove = protect(({ key }) => AsyncStorage.removeItem(`@protected-data/${key}`));
