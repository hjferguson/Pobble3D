import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Segoe-Print': require('./assets/fonts/segoeprint.ttf'),
      'Segoe-Print-Bold': require('./assets/fonts/segoeprint_bold.ttf'),
    });
    console.log('Fonts loaded successfully');
  } catch (e) {
    console.error('Error loading fonts', e);
  }
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
        await SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
      } catch (e) {
        console.error('Error during splash screen hide', e);
      }
    };
    prepare();
  }, []);

  if (!fontsLoaded) {
    console.log('Fonts not loaded yet');
    return null; // Return null while fonts are loading
  }

  console.log('Fonts loaded, rendering app');
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
