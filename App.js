import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ShortlistProvider } from './context/ShortlistContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <ShortlistProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ShortlistProvider>
  );
}