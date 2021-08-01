import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { t } from 'i18n-js';

import AuthContext from '../features/auth/AuthContext';

import DrawerScreen from '../features/mainScreen/DrawerScreen';
import MainScreen from '../features/mainScreen/MainScreen';
import SettingsScreen from '../features/settings/SettingsScreen';
import LockScreen from '../features/auth/LockScreen';
import AuthState from '../Component/AuthState';
import PinValidatorScreen from '../features/auth/PinValidatorScreen';
import ChangePinScreen from '../features/auth/ChangePinScreen';

import withPinValidation from '../features/auth/withPinValidation';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const SecureChangePinScreen = withPinValidation(ChangePinScreen);

function NestedDrawer() {
  return (
    <Drawer.Navigator drawerContent={DrawerScreen}>
      <Drawer.Screen name="MainDrawerScreen" component={MainScreen} />
    </Drawer.Navigator>
  );
}

export default function Router() {
  const { token } = useContext(AuthContext);
  const context = useContext(AuthContext);

  console.log('context', context);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {token === null ? (
          <RootStack.Screen
            name="lock-screen"
            component={LockScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <RootStack.Group>
              <RootStack.Screen
                name="main"
                component={AuthState}
                options={{ headerShown: false }}
              />
            </RootStack.Group>

            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
              <RootStack.Screen
                name="ChangePin"
                component={SecureChangePinScreen}
                options={({ route: { params: { title } = {} } }) => ({ title })}
              />

              <RootStack.Screen
                name="PinValidator"
                component={PinValidatorScreen}
              />
            </RootStack.Group>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

/*
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

          */
