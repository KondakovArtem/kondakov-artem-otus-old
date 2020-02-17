import React, {FC} from 'react';
import {Button, Typography} from 'antd';
import {GoogleLogin} from 'react-google-login';
import {connect} from 'react-redux';
import {AnimatePresence} from 'framer-motion';

import {InputComponent} from 'components/input/input.component';
import {GOOGLE_WEB_CLIENT_ID} from 'constants/auth';
import {signInWithGoogle} from 'services/auth/auth.service';
import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {BackgroundComponent, ContainerComponent, Logo, Title, FullWidthButtonComponent} from 'components/login';

export interface IProps {
  username: string;
  password: string;
  showPassword: boolean;
  isFetching: boolean;
  errors: {
    [key: string]: string;
  };
}

export interface IHandlers {
  setUsername(value: string): void;
  setPassword(value: string): void;
  toggleShowPassword(value: boolean): void;
  toSignUp(): void;
  signIn(): void;
}

export const LoginPageComponent: FC<IProps & IHandlers> = ({
  username,
  setUsername,
  setPassword,
  password,
  showPassword,
  toggleShowPassword,
  toSignUp,
  isFetching,
  signIn,
  errors,
}) => (
  <BackgroundComponent>
    <ContainerComponent>
      <Logo />
      <Title color="white" level={2}>
        Login MyTwitter
      </Title>
      <div style={{width: '100%'}}>
        <InputComponent
          disabled={isFetching}
          placeholder={'Email'}
          leftIcon="user"
          onChangeText={setUsername}
          errorMessage={errors.username}>
          {username}
        </InputComponent>

        <InputComponent
          leftIcon="lock"
          disabled={isFetching}
          password
          onChangeText={setPassword}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          errorMessage={errors.password}>
          {password}
        </InputComponent>

        <FullWidthButtonComponent disabled={isFetching} loading={isFetching} icon="login" onClick={signIn}>
          Sign In
        </FullWidthButtonComponent>

        <GoogleLogin
          clientId={GOOGLE_WEB_CLIENT_ID}
          render={renderProps => (
            <FullWidthButtonComponent
              type="danger"
              icon="google"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled || isFetching}>
              Sign in with Google
            </FullWidthButtonComponent>
          )}
          onSuccess={data => {
            signInWithGoogle(data);
          }}
          onFailure={error => {
            // debugger;
          }}>
          <span> Login with Google</span>
        </GoogleLogin>

        <Typography.Text>
          {`Don't have an account?`}
          <Button type="link" ghost onClick={toSignUp}>
            Sign up
          </Button>
        </Typography.Text>
      </div>
    </ContainerComponent>
  </BackgroundComponent>
);

export const LoginPage = connect<IProps, IHandlers, {}, IConfiguredStore>(
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
    // signInGoogle: authActions.signInGoogle,
    toSignUp: authActions.toSignUp,
  },
)(LoginPageComponent);
