import React, {useState} from 'react';
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
import {Formik} from 'formik';
import * as Yup from 'yup';
import firebase from '@react-native-firebase/app';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import '@react-native-firebase/auth';
import {Button, SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is Required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginScreen = ({navigation: {navigate}}) => {
  const [user, setUser] = useState(null);

  const login = values => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        let {user} = response;
        setUser(user);

        alert('Login success');
        setTimeout(() => {
          setUser(null);
          navigate('Home');
        }, 2000);
      })
      .catch(err => {
        alert(err);
      });
  };

  const facebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }

    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    await firebase.auth().signInWithCredential(credential);
    alert('Login success');
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} enabled>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Icon name="md-fitness" size={80} color="#1eb2a6" />
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values, {setSubmitting}) => {
            login(values);
            setSubmitting(false);
          }}
          validationSchema={LoginSchema}>
          {({handleChange, errors, handleSubmit, isValid, dirty}) => (
            <>
              <View style={styles.wrapper}>
                <View style={styles.input}>
                  <Icon
                    style={{marginLeft: 10}}
                    name="ios-mail"
                    color="#a1e6e3"
                    size={25}
                  />
                  <TextInput
                    onChangeText={handleChange('email')}
                    style={{marginLeft: 10, width: '100%'}}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                </View>
                {errors.email ? (
                  <Text
                    style={{color: 'red', paddingLeft: 10, paddingBottom: 20}}>
                    {errors.email}
                  </Text>
                ) : null}
                <View style={styles.input}>
                  <Icon
                    style={{marginLeft: 10}}
                    name="ios-lock"
                    color="#a1e6e3"
                    size={25}
                  />
                  <TextInput
                    onChangeText={handleChange('password')}
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
                {errors.password ? (
                  <Text
                    style={{color: 'red', paddingLeft: 10, paddingBottom: 20}}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>
              <View style={styles.socialWrapper}>
                <Text style={styles.signinwith}>Sign in with</Text>
                <View style={styles.socialLogin}>
                  <TouchableOpacity onPress={() => facebookLogin()}>
                    <SocialIcon type="facebook" light />
                  </TouchableOpacity>
                  <SocialIcon type="google" light />
                </View>
                <Button
                  disabled={!(isValid && dirty)}
                  title="Login"
                  loading={false}
                  loadingProps={{size: 'small', color: 'white'}}
                  buttonStyle={{
                    backgroundColor: '#1eb2a6',
                    borderRadius: 5,
                  }}
                  titleStyle={{fontWeight: 'bold', fontSize: 14}}
                  containerStyle={{marginVertical: 10, height: 50, width: 300}}
                  onPress={handleSubmit}
                  underlayColor="transparent"
                />
              </View>
              <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                <Text style={{textAlign: 'center', color: 'navy'}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
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
