import React from 'react';
import { t } from 'i18n-js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import DrawerScreen from './app/DrawerScreen';
import MainScreen from './app/MainScreen';
import SettingsScreen from './features/settings/SettingsScreen';
import LockScreen from './features/protection/LockScreen';
import SetPinScreen from './features/protection/SetPinScreen';

import { selectProtection } from './features/protection/protectionSlice';

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
  const { token } = useSelector(selectProtection);

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
                title: t('#settings-screen')
              }}
            />
            <Stack.Screen
              name="set-pin"
              component={SetPinScreen}
              options={{
                title: t('#settings-set-pin')
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
