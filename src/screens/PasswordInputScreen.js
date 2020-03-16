import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {Button} from 'react-native-elements';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const SignupSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
});

const PasswordInputScreen = ({route, navigation}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = values => {
    setLoading(true);
    const email = route.params.email;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, values.password)
      .then(user => {
        setUser(user);
        alert('Registration success');

        setTimeout(() => {
          navigation.navigate('Intro');
        }, 2000);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior="padding"
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 84}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Icon name="md-fitness" size={80} color="#1eb2a6" />
          <Text style={{textAlign: 'center'}}>
            Now let's setup your password
          </Text>
        </View>
        <Formik
          initialValues={{password: '', passwordConfirm: ''}}
          onSubmit={(values, {setSubmitting}) => {
            signUp(values);
            setSubmitting(false);
          }}
          validationSchema={SignupSchema}>
          {({errors, isValid, dirty, handleSubmit, handleChange, values}) => (
            <>
              <View style={styles.wrapperInput}>
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
                    onChangeText={handleChange('password')}
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
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    onChangeText={handleChange('passwordConfirm')}
                  />
                </View>
                {errors.password ? (
                  <Text style={{color: 'red', paddingLeft: 10}}>
                    {errors.password}
                  </Text>
                ) : null}
                {errors.passwordConfirm ? (
                  <Text style={{color: 'red', paddingLeft: 10}}>
                    {errors.passwordConfirm}
                  </Text>
                ) : null}
                <BarPasswordStrengthDisplay
                  width={300}
                  barContainerStyle={{alignSelf: 'center'}}
                  password={values.password}
                />
              </View>
              <View style={styles.btnWrapper}>
                <Button
                  disabled={!(isValid && dirty)}
                  title="Continue"
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
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#F4F6FA',
    height: '100%',
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
  btnWrapper: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLogin: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '90%',
  },
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapperInput: {
    paddingTop: 10,
    flex: 1,
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
});

export default PasswordInputScreen;
