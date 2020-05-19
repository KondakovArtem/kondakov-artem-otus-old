import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

import {Actions as loginAction} from '@app/redux/login/login.ducks';
import {IConfiguredStore} from '@app/redux/store';

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
    <KeyboardAvoidingViewContainer>
      <LoginScrollView>
        <LoginTitle>Log In</LoginTitle>
        <Input
          {...inputStyleProps}
          value={username}
          onChangeText={setUsername}
          label={'Username or email'}
          leftIcon={{type: 'ionicons', name: 'person', color: 'white'}}
        />
        <Input
          {...inputStyleProps}
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
            type={'material-community'}
            name={'arrow-right'}
            reverse={true}
            reverseColor={'#29ccea'}
            raised={true}
            color={'#A9F2FF'}
            onPress={signIn}
          />
        </LoginButton>
      </LoginScrollView>
    </KeyboardAvoidingViewContainer>
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
