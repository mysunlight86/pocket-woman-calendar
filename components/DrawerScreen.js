import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainDrawer from './MainDrawer';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <Drawer.Navigator drawerContent={MainDrawer}>
      <Drawer.Screen
        name="MainDrawerScreen"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
}
