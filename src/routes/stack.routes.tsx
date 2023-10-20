import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginApp from '../screens/Login';
import HomeApp from '../screens/Home';
import ProfileApp from '../screens/Perfil';
const Stack = createNativeStackNavigator();

export default function StackComponent() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeApp}
        options={{
          headerTitle: 'Menu Principal',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileApp}
        options={{headerTitle: 'Perfil'}}
      />
    </Stack.Navigator>
  );
}
