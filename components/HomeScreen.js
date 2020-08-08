import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import i18n from 'i18n-js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import DetailsScreen from './DetailsScreen';
import DebugScreen from './DebugScreen';
import LockScreen from './LockScreen';

const MainTabs = createBottomTabNavigator();

export default function Home() {
  return (
    <MainTabs.Navigator initialRouteName="Home">
      <MainTabs.Screen
        name="Lock"
        component={LockScreen}
        options={{
          title: i18n.t('Lock'),
          tabBarIcon: () => (<Icon name="lock" />),
        }}
        initialParams={{
          lock: true
        }}
      />

      <MainTabs.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: i18n.t('Calendar'),
          tabBarIcon: () => (<Icon name="calendar" />),
        }}
      />

      <MainTabs.Screen
        name="Statistic"
        component={DetailsScreen}
        options={{
          title: i18n.t('Statistics'),
          tabBarIcon: () => (<Icon name="graph" />)
        }}
      />

      <MainTabs.Screen
        name="Debug"
        component={DebugScreen}
      />
    </MainTabs.Navigator>
  );
}
