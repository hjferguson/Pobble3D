// HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../globalStyles';

const screen = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  useEffect(() => {
   
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Game')}
        >
          <Text style={globalStyles.textBold}>Start Game</Text>
        </TouchableOpacity>

        
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={globalStyles.textBold}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screen.height,
  },
  button: {
    backgroundColor: '#7A6FB5', //purple
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
    minWidth: '75%',
  },
});
