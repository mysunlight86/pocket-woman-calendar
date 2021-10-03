import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import initLocale from '../common/locale';
import AuthProvider from '../features/auth/AuthProvider';
import AuthDebugScreen from '../common/AuthDebugScreen';
import PinRequestBlock from '../features/auth/PinRequestBlock';
import MessageBox from '../common/MessageBox';

initLocale();

const RootStack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Group>
            <RootStack.Screen
              name="Main"
              component={AuthDebugScreen}
              options={{ headerShown: false }}
            />

            <RootStack.Screen
              name="PinRequestBlock"
              component={PinRequestBlock}
            />
          </RootStack.Group>

          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen
              name="MessageBox"
              component={MessageBox}
              options={({ route }) => ({ title: route.params.title })}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
