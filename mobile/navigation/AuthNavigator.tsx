import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import { Colors } from '../constants/theme';

export type AuthStackParamList = {
  Landing: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.bg },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
    </Stack.Navigator>
  );
}
