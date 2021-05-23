import React from 'react';
import { t } from 'i18n-js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import LoadingScreen from '../features/protection/LoadingScreen';
import DrawerScreen from '../features/routing/DrawerScreen';
import MainScreen from './MainScreen';
import SettingsScreen from '../features/settings/SettingsScreen';
import LockScreen from '../features/protection/LockScreen';

import {
  selectIsLoaded,
  selectToken,
} from '../features/protection/protectionSlice';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function NestedDrawer() {
  return (
    <Drawer.Navigator drawerContent={DrawerScreen}>
      <Drawer.Screen name="MainDrawerScreen" component={MainScreen} />
    </Drawer.Navigator>
  );
}

export default function Router() {
  const isLoaded = useSelector(selectIsLoaded);
  const token = useSelector(selectToken);

  if (!isLoaded) return <LoadingScreen />;

  // TODO: remove set-pin

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token === null ? (
          <Stack.Screen
            name="lock-screen"
            component={LockScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="main"
              component={NestedDrawer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="settings"
              component={SettingsScreen}
              options={{
                headerShown: true,
                title: t('Settings'),
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
