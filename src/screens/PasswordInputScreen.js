import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const PasswordInputScreen = ({navigation: {navigate}}) => {
  const [password, setPassword] = useState('');

  const onChange = val => {
    setPassword(val);
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
              onChangeText={onChange}
            />
          </View>
          <BarPasswordStrengthDisplay
            width={300}
            barContainerStyle={{alignSelf: 'center'}}
            password={password}
          />
        </View>
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
        <View style={styles.btnWrapper}>
          <Button
            title="Continue"
            loading={false}
            loadingProps={{size: 'small', color: 'white'}}
            buttonStyle={{
              backgroundColor: '#1eb2a6',
              borderRadius: 5,
            }}
            titleStyle={{fontWeight: 'bold', fontSize: 14}}
            containerStyle={{marginVertical: 10, height: 50, width: 300}}
            onPress={() => navigate('PasswordInput')}
            underlayColor="transparent"
          />
        </View>
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
