import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginApp from '../screens/Login';
import HomeApp from '../screens/Home';

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
    </Stack.Navigator>
  );
}
