import React, {FC} from 'react';
import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {InputComponent} from 'components/input/input.component';
import {Logo, BackgroundComponent, ContainerComponent, Title, FullWidthButtonComponent} from 'components/login';

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

export const SignUpPageComponent: FC<IProps & IHandlers> = props => {
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
    <BackgroundComponent>
      <ContainerComponent>
        <Logo />
        <Title color="white" level={2}>
          Signing Up
        </Title>
        <div style={{width: '100%'}}>
          <InputComponent
            disabled={isFetching}
            leftIcon="user"
            placeholder={'Email'}
            onChangeText={setUsername}
            errorMessage={errors.username}>
            {username}
          </InputComponent>

          <InputComponent
            password
            disabled={isFetching}
            onChangeText={setPassword}
            placeholder={'Password'}
            showPassword={showPassword}
            errorMessage={errors.password}
            toggleShowPassword={toggleShowPassword}>
            {password}
          </InputComponent>

          <InputComponent
            disabled={isFetching}
            password
            onChangeText={setRepeatPassword}
            placeholder={'Repeat Password'}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            errorMessage={errors.repeatPassword}>
            {repeatPassword}
          </InputComponent>

          <FullWidthButtonComponent loading={isFetching} disabled={isFetching} onClick={createAccount}>
            Create an account
          </FullWidthButtonComponent>
        </div>
      </ContainerComponent>
    </BackgroundComponent>
  );
};

export const SignUpPage = connect<IProps, IHandlers, {}, IConfiguredStore>(
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
)(SignUpPageComponent);
