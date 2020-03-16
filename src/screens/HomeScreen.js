import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="md-fitness" size={80} color="#1eb2a6" />
        <Text style={styles.h4}>Your Workout Tracking App</Text>
        <Text style={styles.h5}>Are you ready to start burn today?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
});

export default HomeScreen;
