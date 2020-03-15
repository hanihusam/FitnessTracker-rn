import * as React from 'react';
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
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const EmailFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const EmailInputScreen = ({navigation: {navigate}}) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={'padding'}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 84}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Icon name="md-fitness" size={80} color="#1eb2a6" />
          <Text style={{textAlign: 'center'}}>
            What is your e-mail address?
          </Text>
        </View>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={EmailFormSchema}
          onSubmit={values => {
            navigate('PasswordInput', {email: values.email});
          }}>
          {({errors, isValid, dirty, handleSubmit, handleChange}) => (
            <>
              <View style={styles.wrapperInput}>
                <View style={styles.input}>
                  <Icon
                    style={{marginLeft: 10}}
                    name="ios-mail"
                    color="#a1e6e3"
                    size={25}
                  />
                  <TextInput
                    style={{marginLeft: 10, width: '100%'}}
                    placeholderTextColor="grey"
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onChangeText={handleChange('email')}
                  />
                </View>
                {errors.email ? (
                  <Text style={{color: 'red', paddingLeft: 10}}>
                    {errors.email}
                  </Text>
                ) : null}
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
        {/* <Input
          leftIcon={
            <Icon
              name="email-outline"
              color="rgba(110, 120, 170, 1)"
              size={25}
            />
          }
          placeholder="enter your Email"
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: "white",
            borderLeftWidth: 0,
            height: 50,
            backgroundColor: "white",
            marginBottom: 20
          }}
          placeholderTextColor="grey"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          // ref={input => (email2Input = input)}
          onSubmitEditing={() => {
            this.password2Input.focus();
          }}
        /> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  wrapperInput: {paddingHorizontal: 20, paddingTop: 10},
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

export default EmailInputScreen;
