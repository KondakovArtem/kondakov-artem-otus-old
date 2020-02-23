import React, {FC} from 'react';
import {StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
//@ts-ignore;
import {Scene as MagicScene} from 'react-native-magic-move';

import {Actions as loginAction} from '@app/redux/login/login.ducks';
import {IConfiguredStore} from '@app/redux/store';
import {setTestId} from '@app/services/core/core.service';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    color: 'white',
    fontWeight: '100',
  },
  inputLabel: {
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

const LoginTitle = styled.Text`
  color: white;
  font-size: 30;
  width: 100%;
  padding-left: 8px;
  margin-bottom: 30px;
`;

const LoginScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView`
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #29ccea;
  padding: 30px;
`;

const LoginButton = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const inputStyleProps = {
  placeholderTextColor: styles.inputSelection.color,
  selectionColor: styles.inputSelection.color,
  inputContainerStyle: styles.inputUnderline,
  inputStyle: styles.input,
  labelStyle: styles.inputLabel,
  containerStyle: styles.inputContainer,
};

interface IProps {
  showPassword: boolean;
  username: string;
  password: string;
}
interface IHandlers {
  toggleShowPassword: () => void;
  setPassword: (pwd: string) => void;
  setUsername: (username: string) => void;
  signIn: () => void;
}

export const LoginScreenComponent: FC<IProps & IHandlers> = props => {
  const {showPassword, toggleShowPassword, username, password, setPassword, setUsername, signIn} = props;

  return (
    <MagicScene {...setTestId('loginScreen')}>
      <KeyboardAvoidingViewContainer>
        <LoginScrollView>
          <LoginTitle>Log In</LoginTitle>
          <Input
            {...inputStyleProps}
            {...setTestId('username')}
            value={username}
            onChangeText={setUsername}
            label={'Username or email'}
            leftIcon={{type: 'ionicons', name: 'person', color: 'white'}}
          />
          <Input
            {...inputStyleProps}
            {...setTestId('password')}
            onChangeText={setPassword}
            value={password}
            label={'Password'}
            leftIcon={{type: 'ionicons', name: 'lock', color: 'white'}}
            rightIcon={{
              type: 'material-community',
              name: showPassword ? 'eye' : 'eye-off',
              color: 'white',
              onPress: () => toggleShowPassword(),
              underlayColor: 'transparent',
            }}
            secureTextEntry={!showPassword}
          />
          <LoginButton>
            <Icon
              {...setTestId('loginButton')}
              type={'material-community'}
              name={'arrow-right'}
              reverse={true}
              reverseColor={'#29ccea'}
              raised={true}
              color={'#A9F2FF'}
              background={TouchableNativeFeedback.Ripple('white', true)}
              onPress={signIn}
            />
          </LoginButton>
        </LoginScrollView>
      </KeyboardAvoidingViewContainer>
    </MagicScene>
  );
};

export const LoginScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({login}) => ({
    ...login,
  }),
  {
    setUsername: loginAction.setUsername,
    setPassword: loginAction.setPassword,
    toggleShowPassword: loginAction.toggleShowPassword,
    signIn: loginAction.signIn,
  },
)(LoginScreenComponent);
