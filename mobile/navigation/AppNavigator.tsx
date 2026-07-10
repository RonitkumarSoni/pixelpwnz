import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store/hooks';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import ChatScreen from '../screens/ChatScreen';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isLoggedIn } = useAppSelector((s) => s.session);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          {/* We keep ChatScreen outside the tab navigator because it should hide tabs when active */}
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen} 
            options={{ gestureEnabled: true }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
