import React, {FC} from 'react';
import {StyleSheet, ImageBackground, View, Image} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {Input} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {IConfiguredStore} from '@app/redux/store';

interface IProps {
  showPassword: boolean;
  username: string;
  password: string;
}
interface IHandlers {
  toggleShowPassword?: () => void;
  setPassword?: (pwd: string) => void;
  setUsername?: (username: string) => void;
  signIn?: () => void;
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
  },

  input: {
    color: 'white',
    fontWeight: '100',
  },
  inputLabel: {
    paddingTop: 20,
    color: 'white',
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  inputUnderline: {
    borderBottomColor: 'white',
  },
  inputSelection: {
    color: '#ffffffa0',
  },
});

const inputStyleProps = {
  placeholderTextColor: styles.inputSelection.color,
  selectionColor: styles.inputSelection.color,
  inputContainerStyle: styles.inputUnderline,
  inputStyle: styles.input,
  labelStyle: styles.inputLabel,
};

export const LoginScreenComponent: FC<IProps & IHandlers> = props => {
  const {showPassword, toggleShowPassword, username, password, setPassword, setUsername, signIn} = props;

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground style={styles.login} source={require('mytwitter/assets/images/launch_screen.jpg')}>
        <Animatable.View style={{alignItems: 'center'}} animation={'zoomIn'} useNativeDriver={true} duration={500}>
          <View style={{alignItems: 'center', paddingTop: 92}}>
            <Image
              source={require('mytwitter/assets/images/logo.png')}
              style={{height: 160, aspectRatio: 1}}
              resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              alignItems: "stretch",
              width: '100%',
              minWidth: 350,
              maxWidth: 400,
              paddingHorizontal: 10,
            }}>
            <Input {...inputStyleProps} label="Email" />
            <Input {...inputStyleProps} label="Password" secureTextEntry={true} autoCompleteType={'password'} />
          </View>
        </Animatable.View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export const LoginScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({auth}) => ({
    ...auth,
  }),
  {
    // setUsername: loginAction.setUsername,
    // setPassword: loginAction.setPassword,
    // toggleShowPassword: loginAction.toggleShowPassword,
    // signIn: loginAction.signIn,
  },
)(LoginScreenComponent);
