import React, {FC} from 'react';
import {StyleSheet, ImageBackground, View, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {Button, Text, SocialIcon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {InputPaswordComponent} from '@app/components/input-password/input-password.component';
import {InputComponent} from '@app/components/input/input.component';

interface IProps {
  showPassword: boolean;
  username: string;
  password: string;
  isFetching: boolean;
}
interface IHandlers {
  toggleShowPassword: () => void;
  setPassword: (pwd: string) => void;
  setUsername: (username: string) => void;
  signIn: () => void;
  signInGoogle: () => void;
  toSignUp: () => void;
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export const LoginScreenComponent: FC<IProps & IHandlers> = props => {
  const {
    showPassword,
    toggleShowPassword,
    username,
    password,
    setPassword,
    setUsername,
    isFetching,
    signIn,
    signInGoogle,
    toSignUp,
  } = props;

  const checkButtonDisabled = () => {
    return !(password !== '' && username !== '' && !isFetching);
  };

  return (
    <MagicMove.Scene>
      <StatusBar backgroundColor="#F06332" barStyle="light-content" />
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <MagicMove.View
          id="login_header"
          // debug
          transition={MagicMove.Transition.morph}
          duration={200}
          style={{borderBottomLeftRadius: 150, backgroundColor: '#F06332'}}>
          <ImageBackground
            style={styles.login}
            imageStyle={{borderBottomLeftRadius: 150}}
            source={require('mytwitter/assets/images/launch_screen.jpg')}>
            <View style={{alignItems: 'center', paddingTop: 42}}>
              <MagicMove.Image
                id="logo"
                transition={MagicMove.Transition.morph}
                duration={150}
                source={require('mytwitter/assets/images/logo.png')}
                style={{height: 160, aspectRatio: 1}}
                resizeMode={'contain'}
              />
              <View style={{alignItems: 'flex-end', width: '100%'}}>
                <MagicMove.Text
                  id="logo_text"
                  transition={MagicMove.Transition.morph}
                  duration={150}
                  style={{color: 'white'}}>
                  Login
                </MagicMove.Text>
              </View>
            </View>
          </ImageBackground>
        </MagicMove.View>

        <Animatable.View
          style={{alignItems: 'center', flex: 2, justifyContent: 'space-evenly'}}
          animation={'zoomIn'}
          useNativeDriver={true}
          duration={500}>
          <View
            style={{
              alignItems: 'stretch',
              width: '100%',
              minWidth: 350,
              maxWidth: 400,
              paddingHorizontal: 30,
            }}>
            {/* <Input
              disabled={isFetching}
              {...inputStyleProps}
              value={username}
              leftIcon={<Icon name="email-outline" type="material-community" />}
              placeholder={'Email'}
              onChangeText={setUsername}
            /> */}

            <InputComponent
              disabled={isFetching}
              leftIcon={{name: 'email-outline', type: 'material-community'}}
              placeholder={'Email'}
              onChangeText={setUsername}>
              {username}
            </InputComponent>

            <InputPaswordComponent
              disabled={isFetching}
              onChangeText={setPassword}
              placeholder={'Password'}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}>
              {password}
            </InputPaswordComponent>

            <SocialIcon
              disabled={isFetching}
              style={{marginTop: 30}}
              title="Sign in with Google"
              button
              type="google"
              onPress={signInGoogle}
            />
          </View>
          <View style={{width: '100%'}}>
            <Button
              disabled={checkButtonDisabled()}
              loading={isFetching}
              buttonStyle={{
                marginTop: 20,
                borderRadius: 0,
                height: 60,
                backgroundColor: '#E75527',
              }}
              titleStyle={{
                fontSize: 20,
              }}
              title="Login"
              onPress={signIn}
            />
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={toSignUp}>
              <Text style={{fontWeight: 'bold'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </KeyboardAwareScrollView>
    </MagicMove.Scene>
  );
};

export const LoginScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({authData}) => {
    const {login} = authData;
    return {
      ...login,
    };
  },
  {
    setUsername: authActions.setUsername,
    setPassword: authActions.setPassword,
    toggleShowPassword: authActions.toggleShowPassword,
    signIn: authActions.signIn,
    signInGoogle: authActions.signInGoogle,
    toSignUp: authActions.toSignUp,
  },
)(LoginScreenComponent);
