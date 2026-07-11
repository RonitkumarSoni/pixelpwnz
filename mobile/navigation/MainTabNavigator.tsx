import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import UploadScreen from '../screens/UploadScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors, Spacing } from '../constants/theme';

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Create: undefined;
  Bookmarks: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primarySolid,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
            <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
          </BlurView>
        ),
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={22} />,
        }}
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={22} />,
        }}
      />
      <Tab.Screen 
        name="Create" 
        component={UploadScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.createButton}>
              <Feather name="plus" color="#FFF" size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="bookmark" color={color} size={22} />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={22} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primarySolid,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  }
});
