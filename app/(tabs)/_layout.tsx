import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme()


  return (
    <ThemeProvider value = {colorScheme === 'dark'?
      DarkTheme: DefaultTheme}>
    <Stack 
      screenOptions={{
        headerShown: false
      }}
    />
    <StatusBar
    barStyle ='light-content'
    backgroundColor= 'black'
    translucent ={false}
    />
    </ThemeProvider>
  );
}
