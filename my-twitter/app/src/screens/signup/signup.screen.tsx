import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {IConfiguredStore} from '@app/redux/store';
import {Actions as authActions} from '@app/redux/auth/auth.ducks';
import {InputPaswordComponent} from '@app/components/input-password/input-password.component';
import {InputComponent} from '@app/components/input/input.component';

interface IProps {
  username: string;
  password: string;
  repeatPassword: string;
  showPassword: boolean;
  isFetching: boolean;
  errors: {
    [key: string]: string;
  };
}
interface IHandlers {
  setPassword(value: string): void;
  setRepeatPassword(value: string): void;
  setUsername(value: string): void;
  toggleShowPassword(): void;
  createAccount(): void;
}

export const SignUpScreenComponent: FC<IProps & IHandlers> = props => {
  const {
    password,
    repeatPassword,
    username,
    isFetching,
    showPassword,
    setPassword,
    setRepeatPassword,
    toggleShowPassword,
    createAccount,
    setUsername,
    errors = {},
  } = props;
  return (
    <MagicMove.Scene>
      <MagicMove.View
        // debug
        id="login_header"
        transition={MagicMove.Transition.morph}
        duration={200}
        style={{height: 60, backgroundColor: '#F06332', flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
        <MagicMove.Image
          id="logo"
          transition={MagicMove.Transition.morph}
          duration={200}
          source={require('mytwitter/assets/images/logo.png')}
          style={{width: 60, aspectRatio: 1}}
          resizeMode={'contain'}
        />
        <MagicMove.Text
          id="logo_text"
          transition={MagicMove.Transition.morph}
          duration={200}
          style={{color: 'white', paddingLeft: 10}}>
          Sign Up
        </MagicMove.Text>
      </MagicMove.View>

      <Animatable.View style={{alignItems: 'center'}} animation={'zoomIn'} useNativeDriver={true} duration={500}>
        <View
          style={{
            alignItems: 'stretch',
            width: '100%',
            minWidth: 350,
            maxWidth: 400,
            paddingHorizontal: 30,
            paddingTop: 20,
          }}>
          <InputComponent
            disabled={isFetching}
            leftIcon={{name: 'email-outline', type: 'material-community'}}
            placeholder={'Email'}
            onChangeText={setUsername}
            errorMessage={errors.username}>
            {username}
          </InputComponent>
          <InputPaswordComponent
            disabled={isFetching}
            onChangeText={setPassword}
            placeholder={'Password'}
            showPassword={showPassword}
            errorMessage={errors.password}
            toggleShowPassword={toggleShowPassword}>
            {password}
          </InputPaswordComponent>
          <InputPaswordComponent
            disabled={isFetching}
            onChangeText={setRepeatPassword}
            placeholder={'Repeat Password'}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            errorMessage={errors.repeatPassword}>
            {repeatPassword}
          </InputPaswordComponent>
        </View>
        <View style={{width: '100%'}}>
          <Button
            buttonStyle={{
              marginTop: 20,
              borderRadius: 0,
              height: 60,
              backgroundColor: '#E75527',
            }}
            titleStyle={{
              fontSize: 20,
            }}
            loading={isFetching}
            title="Create Account"
            onPress={createAccount}
          />
        </View>
      </Animatable.View>
    </MagicMove.Scene>
  );
};

export const SignUpScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({authData}) => {
    const {login} = authData;
    return {
      ...login,
    };
  },
  {
    setPassword: authActions.setPassword,
    setUsername: authActions.setUsername,
    setRepeatPassword: authActions.setRepeatPassword,
    toggleShowPassword: authActions.toggleShowPassword,
    createAccount: authActions.createAccount,
  },
)(SignUpScreenComponent);
