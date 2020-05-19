import React, {FC} from 'react';
import {connect} from 'react-redux';
import * as MagicMove from 'react-native-magic-move';
import {View, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {InputPaswordComponent} from 'components/input-password/input-password.component';
import {InputComponent} from 'components/input/input.component';
import {HeaderComponent} from 'components/header/header.component';
import {commonStyles, COMMON_DURATION} from 'constants/theme';
import {FullWidthButtonComponent} from 'components/full-width-button/full-width-button.component';

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

const style = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 20,
  },
});

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
      <HeaderComponent>{'Signing Up'}</HeaderComponent>

      <Animatable.View style={style.wrapper} animation={'zoomIn'} useNativeDriver={true} duration={COMMON_DURATION}>
        <View style={commonStyles.inputContainer}>
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
        <FullWidthButtonComponent loading={isFetching} disabled={isFetching} onPress={createAccount}>
          Create an account
        </FullWidthButtonComponent>
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
