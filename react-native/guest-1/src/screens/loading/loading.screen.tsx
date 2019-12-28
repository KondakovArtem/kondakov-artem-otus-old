import React, {FunctionComponent, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

import triangleLoading from '../../../assets/animations/triangle-loading.json';
import {Actions as loginActions} from '../../redux/login/login.ducks';
import {IConfiguredStore} from '../../redux/store.js';

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const LoadingText = styled.Text`
  font-size: 22;
  margin-top: 100;
  color: #29ccea;
`;

const TextContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export interface IHandlers {
  onInit: () => void;
}

export const LoadingScreenComponent: FunctionComponent<IHandlers> = props => {
  const {onInit} = props;
  useEffect(() => {
    onInit && onInit();
    return () => {
      // cancelSubscription();
    };
  });

  return (
    <Wrapper>
      <LottieView source={triangleLoading} autoPlay loop />
      <TextContainer>
        <LoadingText>Loading</LoadingText>
      </TextContainer>
    </Wrapper>
  );
};

export const LoadingScreen = connect<{}, IHandlers, {}, IConfiguredStore>(() => ({}), {
  onInit: loginActions.initSign,
})(LoadingScreenComponent);
