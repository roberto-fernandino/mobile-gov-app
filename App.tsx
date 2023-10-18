import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginApp from './components/loginApp';
import HomeApp from './components/homeApp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="loginApp" component={LoginApp} />
        <Stack.Screen name="homeApp" component={HomeApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
