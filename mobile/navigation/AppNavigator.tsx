import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadScreen from '../screens/UploadScreen';
import ChatScreen from '../screens/ChatScreen';
import { Colors } from '../constants/theme';

export type RootStackParamList = {
  Upload: undefined;
  Chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Upload"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.bg },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ gestureEnabled: false }} // Prevent swipe-back to Upload
      />
    </Stack.Navigator>
  );
}
