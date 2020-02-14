import React from 'react';
import {Row, Col, Button, Typography, Icon} from 'antd';
import styled, {keyframes} from 'styled-components';
//@ts-ignore
import {zoomIn} from 'react-animations';
import {GoogleLogin} from 'react-google-login';

import {LogoComponent} from 'components/logo/logo.component';
import {COMMON_DURATION} from 'constants/theme';
import {InputComponent} from 'components/input/input.component';
import {Link} from 'react-router-dom';
import {GOOGLE_WEB_CLIENT_ID} from 'constants/auth';
import {signInWithGoogle} from 'services/auth/auth.service';

const Background = styled.div`
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(205, 33, 42, 1) 0%,
    rgba(236, 95, 5, 1) 90%
  );
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff17;
  border-radius: 10px;
  animation: ${COMMON_DURATION / 1000}s ${keyframes`${zoomIn}`};
`;

const Title = styled(Typography.Title)`
  color: white !important;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LogoTest = styled(LogoComponent)`
  width: 150px;
  height: 102px;
`;

const SignInButton = styled(Button)`
  width: 100%;
`;

export const LoginPageComponent = () => {
  return (
    <Background>
      <Container>
        <LogoTest />
        <Title level={2}>Login MyTwitter</Title>
        <Row gutter={[20, 20]} style={{width: '100%'}}>
          <Col>
            <InputComponent placeholder={'Email'} leftIcon="user" />
          </Col>
          <Col>
            <InputComponent leftIcon="lock" password />
          </Col>
          <Col>
            <SignInButton shape="round" type="primary" icon="login" size="large">
              Sign In
            </SignInButton>
          </Col>
          <Col>
            <GoogleLogin
              clientId={GOOGLE_WEB_CLIENT_ID}
              render={renderProps => (
                <SignInButton
                  shape="round"
                  type="danger"
                  icon="google"
                  size="large"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                  Sign in with Google
                </SignInButton>
              )}
              onSuccess={data => {
                signInWithGoogle(data);
              }}
              onFailure={error => {
                debugger;
              }}>
              <span> Login with Google</span>
            </GoogleLogin>
          </Col>

          <Col>
            <Typography.Text>
              {`Don't have an account?`}
              <Link to="/signup">
                <Button type="link" ghost>
                  Sign up
                </Button>
              </Link>
            </Typography.Text>
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export const LoginPage = LoginPageComponent;
