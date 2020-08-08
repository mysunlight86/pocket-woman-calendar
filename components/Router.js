/* Android specific component
    - Stack behavior
    - Use LockScreen */

import React from 'react';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import i18n from 'i18n-js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthenticateContext from './AuthenticateContext';

import AboutScreen from './AboutScreen';
import SettingsScreen from './SettingsScreen';
import LockScreen from './LockScreen';
import DrawerScreen from './DrawerScreen';

/*
    TODO LIST

    TODO: Add open drawer button
    TODO: Rename routes

*/

const RootStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <AuthenticateContext.Consumer>
        {({ token }) => (
          <RootStack.Navigator headerMode={token === null ? 'none' : 'screen'}>
            {token === null
              ? (
                <RootStack.Screen
                  name="SignIn"
                  component={LockScreen}
                />
              )
              : (
                <>
                  <RootStack.Screen
                    name="Main"
                    component={DrawerScreen}
                    options={{ headerShown: false }}
                  />

                  <MainTabs.Screen
                    name="settings"
                    component={SettingsScreen}
                    options={{
                      title: i18n.t('Settings'),
                      tabBarIcon: () => (<Icon name="settings" />)
                    }}
                  />

                  <MainTabs.Screen
                    name="about"
                    component={AboutScreen}
                    options={{
                      title: i18n.t('About'),
                      tabBarIcon: () => (<Icon name="question" />),
                    }}
                  />
                </>
              )}
          </RootStack.Navigator>
        )}
      </AuthenticateContext.Consumer>
    </NavigationContainer>
  );
}
