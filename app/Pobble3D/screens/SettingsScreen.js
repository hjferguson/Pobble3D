import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../globalStyles';

const screen = Dimensions.get('window');

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={globalStyles.textBold}>Profile</Text>
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