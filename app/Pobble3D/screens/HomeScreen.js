import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screen.height, 
  },
  button: {
    backgroundColor: '#7A6FB5', //a shade of purple
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, 
    marginBottom: 20, 
    alignItems: 'center',
    width: '75%',  
  },
  buttonText: {
    color: '#FFFFFF', // Customize the text color
    fontSize: 18,
    fontFamily: 'Segoe Print',
  },
});
