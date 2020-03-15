import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Button} from 'react-native-elements';

const IntroScreen = ({navigation: {navigate}}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="md-fitness" size={80} color="#1eb2a6" />
        <Text style={styles.h4}>Welcome to Daily Workout</Text>
        <Text style={styles.h5}>
          The best app for track fitness workout and meal planner
        </Text>
        <Image
          source={require('../assets/onboard.jpg')}
          style={{width: '100%', height: 300}}
        />
      </View>
      <View style={styles.contentView}>
        <Button
          onPress={() => navigate('EmailInput')}
          title="Get started"
          loading={false}
          loadingProps={{size: 'small', color: 'white'}}
          buttonStyle={{
            backgroundColor: '#1eb2a6',
            borderRadius: 5,
          }}
          titleStyle={{fontWeight: 'bold', fontSize: 16}}
          containerStyle={{marginVertical: 10, height: 50, width: 300}}
          underlayColor="transparent"
        />
        <Text style={{textAlign: 'center', color: 'grey'}}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={styles.signInBtn}>Sign in</Text>
        </TouchableOpacity>
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
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentView: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h4: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signInBtn: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: 'navy',
  },
  h5: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '200',
  },
});

export default IntroScreen;
