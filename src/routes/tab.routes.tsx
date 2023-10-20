import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileApp from '../screens/Perfil';
const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Perfil" component={ProfileApp} />
    </Tab.Navigator>
  );
}
