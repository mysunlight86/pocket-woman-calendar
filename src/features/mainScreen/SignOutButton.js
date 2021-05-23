import { t } from 'i18n-js';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsProtected, signOut } from '../protection/protectionSlice';
import DrawerButton from './DrawerButton';

export default function SignOutButton() {
  const dispatch = useDispatch();
  const isProtected = useSelector(selectIsProtected);
  return isProtected ? (
    <DrawerButton caption={t('Sign Out')} onPress={() => dispatch(signOut())} />
  ) : null;
}
