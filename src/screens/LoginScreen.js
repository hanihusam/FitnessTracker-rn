import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Button, SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const LoginScreen = ({navigation: {navigate}}) => {
  return (
    <KeyboardAvoidingView behavior={'padding'} enabled>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Icon name="md-fitness" size={80} color="#1eb2a6" />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <Icon
              style={{marginLeft: 10}}
              name="ios-mail"
              color="#a1e6e3"
              size={25}
            />
            <TextInput
              style={{marginLeft: 10, width: '100%'}}
              placeholder="Email"
              placeholderTextColor="grey"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={styles.input}>
            <Icon
              style={{marginLeft: 10}}
              name="ios-lock"
              color="#a1e6e3"
              size={25}
            />
            <TextInput
              style={{marginLeft: 10, width: '100%'}}
              placeholderTextColor="grey"
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
            />
          </View>
        </View>
        <View style={styles.socialWrapper}>
          <Text style={styles.signinwith}>Sign in with</Text>
          <View style={styles.socialLogin}>
            <SocialIcon type="facebook" light />
            <SocialIcon type="google" light />
          </View>
          <Button
            title="Login"
            loading={false}
            loadingProps={{size: 'small', color: 'white'}}
            buttonStyle={{
              backgroundColor: '#1eb2a6',
              borderRadius: 5,
            }}
            titleStyle={{fontWeight: 'bold', fontSize: 14}}
            containerStyle={{marginVertical: 10, height: 50, width: 300}}
            onPress={() => console.log('aye')}
            underlayColor="transparent"
          />
        </View>
        <TouchableOpacity onPress={() => navigate('EmailInput')}>
          <Text style={{textAlign: 'center', color: 'navy'}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6FA',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderLeftWidth: 0,
    borderRadius: 10,
    height: 50,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  socialWrapper: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLogin: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default LoginScreen;
