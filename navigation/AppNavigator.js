import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShortlistScreen from '../screens/ShortlistScreen';
import { useShortlist } from '../context/ShortlistContext';

const Tab = createBottomTabNavigator();
const DiscoverStack = createNativeStackNavigator();

const headerStyle = {
  headerStyle: { backgroundColor: '#fff' },
  headerTitleStyle: { fontWeight: '700', color: '#111827', fontSize: 17 },
  headerTintColor: '#111827',
  headerShadowVisible: false,
};

function DiscoverStackNavigator() {
  return (
    <DiscoverStack.Navigator screenOptions={headerStyle}>
      <DiscoverStack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ title: '🏅 ScoutIQ' }}
      />
      <DiscoverStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: route.params?.athlete?.name ?? 'Athlete Profile',
        })}
      />
    </DiscoverStack.Navigator>
  );
}

function TabIcon({ emoji, focused }) {
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
  );
}

function ShortlistTabIcon({ focused }) {
  const { shortlist } = useShortlist();
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
      {'📋'}
      {shortlist.length > 0 ? '' : ''}
    </Text>
  );
}

export default function AppNavigator() {
  const { shortlist } = useShortlist();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="DiscoverTab"
        component={DiscoverStackNavigator}
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🔍" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="ShortlistTab"
        component={ShortlistScreen}
        options={{
          title: 'Shortlist',
          tabBarBadge: shortlist.length > 0 ? shortlist.length : undefined,
          tabBarIcon: ({ focused }) => (
            <ShortlistTabIcon focused={focused} />
          ),
          headerShown: true,
          headerTitle: '📋 Shortlist',
          ...headerStyle,
        }}
      />
    </Tab.Navigator>
  );
}