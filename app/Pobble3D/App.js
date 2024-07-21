import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from './helpers/loadFonts';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

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
    return null; // Return null while fonts are loading
  }

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
